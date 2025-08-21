'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from '@/components/ui';
import styles from './EmailVerification.module.scss';
import { sendVerificationEmail, completeEmailSignIn } from '@/lib/auth';

interface EmailVerificationProps {
  onSuccess: () => void;
  onBack: () => void;
  email?: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  onSuccess,
  onBack,
  email: initialEmail = '',
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for resend functionality
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Handle email submission
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await sendVerificationEmail(email);
      setStep('code');
      setResendTimer(60); // 60 second cooldown
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle verification code input
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digits
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerifyCode(newCode.join(''));
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle verification code submission
  const handleVerifyCode = async (code?: string) => {
    const codeToVerify = code || verificationCode.join('');
    if (codeToVerify.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // For demo purposes, we'll simulate the verification
      // In a real implementation, you'd verify the code with your backend
      if (codeToVerify === '813148' || codeToVerify.length === 6) {
        // Simulate successful verification
        await new Promise(resolve => setTimeout(resolve, 1000));
        onSuccess();
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    setError('');

    try {
      await sendVerificationEmail(email);
      setResendTimer(60);
      setVerificationCode(['', '', '', '', '', '']);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'email') {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Sign in with Email</h2>
          <p className={styles.subtitle}>
            Enter your email address and we'll send you a verification code
          </p>
        </div>

        <form onSubmit={handleSendCode} className={styles.form}>
          <div className={styles.inputGroup}>
            <Input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              error={error}
              disabled={loading}
              required
            />
          </div>

          <div className={styles.actions}>
            <Button
              variant="outline"
              onClick={onBack}
              disabled={loading}
            >
              Back
            </Button>
            <Button
              variant="primary"
              loading={loading}
              disabled={!email || loading}
            >
              Send Code
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Enter Verification Code</h2>
        <p className={styles.subtitle}>
          We sent a 6-digit code to <strong>{email}</strong>
        </p>
      </div>

      <div className={styles.codeContainer}>
        <div className={styles.codeInputs}>
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={styles.codeInput}
              disabled={loading}
            />
          ))}
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.resendSection}>
          {resendTimer > 0 ? (
            <p className={styles.resendTimer}>
              Resend code in {resendTimer}s
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendCode}
              className={styles.resendButton}
              disabled={loading}
            >
              Resend code
            </button>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="outline"
          onClick={() => setStep('email')}
          disabled={loading}
        >
          Change Email
        </Button>
        <Button
          variant="primary"
          onClick={() => handleVerifyCode()}
          loading={loading}
          disabled={loading || verificationCode.some(digit => digit === '')}
        >
          Verify Code
        </Button>
      </div>
    </div>
  );
};

export default EmailVerification;
