'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  sendEmailVerification,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import styles from './welcome.module.scss';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox';
import { FcGoogle } from 'react-icons/fc';

interface SignupStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

const SignupStep: React.FC<SignupStepProps> = ({ onNext, onBack }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: searchParams.get('email') || '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'First name is required';
    if (!formData.lastName.trim()) return 'Last name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!formData.terms) return 'You must accept the terms and conditions';
    return '';
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmailVerified(user.emailVerified);
        if (user.emailVerified) {
          // User is verified, proceed to next step
          if (onNext) onNext();
        }
      }
    });

    return () => unsubscribe();
  }, [onNext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      const user = userCredential.user;
      
      // Send email verification
      await sendEmailVerification(user, {
        url: `${window.location.origin}/welcome?step=2&verified=true`,
        handleCodeInApp: false
      });
      
      setUser(user);
      setVerificationSent(true);
      
    } catch (err: any) {
      console.error('Error:', err);
      let errorMessage = 'An error occurred. Please try again.';
      
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        default:
          errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Google accounts are automatically verified
      if (user.emailVerified || user.providerData.some(p => p.providerId === 'google.com')) {
        // Proceed to next step immediately for Google users
        if (onNext) onNext();
      }
      
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      let errorMessage = 'Failed to sign in with Google. Please try again.';
      
      switch (err.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in was cancelled.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup was blocked. Please allow popups and try again.';
          break;
        default:
          errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError('');
      
      await sendEmailVerification(user, {
        url: `${window.location.origin}/welcome?step=2&verified=true`,
        handleCodeInApp: false
      });
      
    } catch (err: any) {
      console.error('Resend verification error:', err);
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCheckVerification = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError('');
      
      // Reload user to get latest emailVerified status
      await user.reload();
      
      if (user.emailVerified) {
        setEmailVerified(true);
        if (onNext) onNext();
      } else {
        setError('Email not yet verified. Please check your email and click the verification link.');
      }
      
    } catch (err: any) {
      console.error('Check verification error:', err);
      setError('Failed to check verification status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Email verification UI
  if (verificationSent && user && !emailVerified) {
    return (
      <div className={styles.authForm}>
        <h2>Verify your email</h2>
        <p className={styles.subtitle}>
          We've sent a verification link to <strong>{user.email}</strong>
        </p>
        <p className={styles.subtitle}>
          Please check your email and click the verification link to continue.
        </p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.verificationContainer}>
          <Button 
            onClick={handleCheckVerification}
            disabled={isLoading}
            className={styles.verifyButton}
          >
            {isLoading ? 'Checking...' : 'I\'ve verified my email'}
          </Button>
          
          <div className={styles.resendContainer}>
            <p>Didn't receive the email?</p>
            <button 
              className={styles.resendLink}
              onClick={handleResendVerification}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Resend verification email'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authForm}>
      {/* <h2>Create your account</h2>
      <p className={styles.subtitle}>Join our community of creators and innovators</p> */}

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <div className={styles.nameFields}>
          {/* <Input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          /> */}
        </div>

        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />

        <div className={styles.checkboxContainer}>
          <Checkbox
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            label={
              <span>
                I agree to the{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </span>
            }
          />
        </div>

        <Button 
          type="submit"
          disabled={isLoading}
          className={styles.signupButton}
        >
          {isLoading ? 'Sending code...' : 'Sign Up'}
        </Button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className={styles.googleButton}
          disabled={isLoading}
        >
          <FcGoogle className={styles.googleIcon} />
          Sign up with Google
        </Button>
      </form>
    </div>
  );
};

export default SignupStep;
