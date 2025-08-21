import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Email verification settings
const actionCodeSettings = {
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  handleCodeInApp: true,
};

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  tenantId: string;
  communities: string[];
  role: 'owner' | 'admin' | 'member';
  createdAt: any;
  updatedAt: any;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  color: string;
  type: string;
  isPrivate: boolean;
  ownerId: string;
  tenantId: string;
  members: CommunityMember[];
  createdAt: any;
  updatedAt: any;
}

export interface CommunityMember {
  uid: string;
  email: string;
  displayName: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: any;
}

// Generate a unique tenant ID for new users
const generateTenantId = (): string => {
  return `tenant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create or update user profile in Firestore
export const createUserProfile = async (user: User, additionalData?: any): Promise<UserProfile> => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const tenantId = generateTenantId();
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || additionalData?.displayName || '',
      photoURL: user.photoURL || additionalData?.photoURL,
      tenantId,
      communities: [],
      role: 'owner',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...additionalData,
    };

    await setDoc(userRef, userProfile);
    return userProfile;
  } else {
    // Update existing user
    const existingProfile = userSnap.data() as UserProfile;
    const updatedProfile = {
      ...existingProfile,
      displayName: user.displayName || existingProfile.displayName,
      photoURL: user.photoURL || existingProfile.photoURL,
      updatedAt: serverTimestamp(),
      ...additionalData,
    };

    await setDoc(userRef, updatedProfile, { merge: true });
    return updatedProfile;
  }
};

// Email authentication with verification link
export const sendVerificationEmail = async (email: string): Promise<void> => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Store email in localStorage for verification
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('emailForSignIn', email);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Complete email sign-in with verification link
export const completeEmailSignIn = async (email?: string): Promise<UserCredential> => {
  try {
    const url = window.location.href;
    if (!isSignInWithEmailLink(auth, url)) {
      throw new Error('Invalid sign-in link');
    }

    const emailToUse = email || window.localStorage.getItem('emailForSignIn');
    if (!emailToUse) {
      throw new Error('Email not found. Please try signing in again.');
    }

    const result = await signInWithEmailLink(auth, emailToUse, url);
    
    // Clear email from storage
    window.localStorage.removeItem('emailForSignIn');
    
    // Create user profile
    await createUserProfile(result.user);
    
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Google Sign-In
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Create or update user profile
    await createUserProfile(result.user);
    
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Traditional email/password sign-in (fallback)
export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await createUserProfile(result.user);
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Traditional email/password sign-up (fallback)
export const signUpWithEmail = async (email: string, password: string, displayName?: string): Promise<UserCredential> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(result.user, { displayName });
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get user profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Create community
export const createCommunity = async (
  communityData: Omit<Community, 'id' | 'ownerId' | 'tenantId' | 'members' | 'createdAt' | 'updatedAt'>,
  userId: string,
  tenantId: string
): Promise<string> => {
  try {
    const communityRef = doc(db, 'communities', `${tenantId}_${Date.now()}`);
    const community: Community = {
      id: communityRef.id,
      ...communityData,
      ownerId: userId,
      tenantId,
      members: [{
        uid: userId,
        email: auth.currentUser?.email || '',
        displayName: auth.currentUser?.displayName || '',
        role: 'owner',
        joinedAt: serverTimestamp(),
      }],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(communityRef, community);

    // Update user's communities list
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data() as UserProfile;
      await setDoc(userRef, {
        ...userData,
        communities: [...userData.communities, communityRef.id],
        updatedAt: serverTimestamp(),
      });
    }

    return communityRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
