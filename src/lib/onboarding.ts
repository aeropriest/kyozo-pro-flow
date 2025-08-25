import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile } from './auth';

// Onboarding step definitions
export type OnboardingStep = 'auth' | 'avatar' | 'community_details' | 'add_members' | 'dashboard';

export interface OnboardingProgress {
  tenantId: string;
  userId: string;
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  stepData: {
    auth?: {
      email: string;
      displayName: string;
      authMethod: 'email' | 'google';
    };
    avatar?: {
      avatarUrl?: string;
      displayName: string;
    };
    community_details?: {
      communityName: string;
      communityDescription: string;
      communityType?: string;
      communityColor: string;
      isPrivate: boolean;
    };
    add_members?: {
      inviteMethod?: string;
      invitedMembers: Array<{
        email: string;
        role: 'admin' | 'member';
        name?: string;
      }>;
      csvImported?: boolean;
      eventbriteConnected?: boolean;
    };
    dashboard?: {
      setupComplete: boolean;
    };
  };
  createdAt: any;
  updatedAt: any;
}

export interface CommunityOnboarding {
  id: string;
  tenantId: string;
  communityId?: string; // Set after community is created
  ownerId: string; // Super user who started this onboarding
  progress: OnboardingProgress;
  status: 'in_progress' | 'completed' | 'abandoned';
  createdAt: any;
  updatedAt: any;
}

// User roles in the system
export type UserRole = 'super_user' | 'community_manager' | 'community_member';

export interface ExtendedUserProfile extends UserProfile {
  systemRole: UserRole;
  managedCommunities: string[]; // Community IDs this user can manage
  onboardingProgress?: OnboardingProgress;
}

// Save onboarding progress
export const saveOnboardingProgress = async (
  tenantId: string,
  userId: string,
  step: OnboardingStep,
  stepData: any,
  markCompleted: boolean = false
): Promise<void> => {
  try {
    const onboardingRef = doc(db, 'onboarding_progress', `${tenantId}_${userId}`);
    const existingDoc = await getDoc(onboardingRef);
    
    let progress: OnboardingProgress;
    
    if (existingDoc.exists()) {
      progress = existingDoc.data() as OnboardingProgress;
      
      // Update step data
      progress.stepData[step] = stepData;
      progress.currentStep = step;
      progress.updatedAt = serverTimestamp();
      
      // Mark step as completed if specified
      if (markCompleted && !progress.completedSteps.includes(step)) {
        progress.completedSteps.push(step);
      }
    } else {
      // Create new progress
      progress = {
        tenantId,
        userId,
        currentStep: step,
        completedSteps: markCompleted ? [step] : [],
        stepData: {
          [step]: stepData
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
    }
    
    await setDoc(onboardingRef, progress);
    console.log(`🔵 Onboarding progress saved: ${step}`, stepData);
  } catch (error) {
    console.error('Error saving onboarding progress:', error);
    throw error;
  }
};

// Get onboarding progress
export const getOnboardingProgress = async (
  tenantId: string,
  userId: string
): Promise<OnboardingProgress | null> => {
  try {
    const onboardingRef = doc(db, 'onboarding_progress', `${tenantId}_${userId}`);
    const doc_snap = await getDoc(onboardingRef);
    
    if (doc_snap.exists()) {
      return doc_snap.data() as OnboardingProgress;
    }
    return null;
  } catch (error) {
    console.error('Error getting onboarding progress:', error);
    return null;
  }
};

// Complete onboarding step
export const completeOnboardingStep = async (
  tenantId: string,
  userId: string,
  step: OnboardingStep
): Promise<void> => {
  try {
    const onboardingRef = doc(db, 'onboarding_progress', `${tenantId}_${userId}`);
    const existingDoc = await getDoc(onboardingRef);
    
    if (existingDoc.exists()) {
      const progress = existingDoc.data() as OnboardingProgress;
      
      if (!progress.completedSteps.includes(step)) {
        progress.completedSteps.push(step);
        progress.updatedAt = serverTimestamp();
        
        await updateDoc(onboardingRef, {
          completedSteps: progress.completedSteps,
          updatedAt: progress.updatedAt
        });
      }
    }
  } catch (error) {
    console.error('Error completing onboarding step:', error);
    throw error;
  }
};

// Get next onboarding step
export const getNextOnboardingStep = (progress: OnboardingProgress): OnboardingStep | null => {
  const allSteps: OnboardingStep[] = ['auth', 'avatar', 'community_details', 'add_members', 'dashboard'];
  
  for (const step of allSteps) {
    if (!progress.completedSteps.includes(step)) {
      return step;
    }
  }
  
  return null; // All steps completed
};

// Check if onboarding is complete
export const isOnboardingComplete = (progress: OnboardingProgress): boolean => {
  const requiredSteps: OnboardingStep[] = ['auth', 'avatar', 'community_details', 'add_members', 'dashboard'];
  return requiredSteps.every(step => progress.completedSteps.includes(step));
};

// Create community onboarding session
export const createCommunityOnboarding = async (
  tenantId: string,
  ownerId: string
): Promise<string> => {
  try {
    const onboardingId = `${tenantId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const onboardingRef = doc(db, 'community_onboarding', onboardingId);
    
    const communityOnboarding: CommunityOnboarding = {
      id: onboardingId,
      tenantId,
      ownerId,
      progress: {
        tenantId,
        userId: ownerId,
        currentStep: 'auth',
        completedSteps: [],
        stepData: {},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      status: 'in_progress',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    await setDoc(onboardingRef, communityOnboarding);
    return onboardingId;
  } catch (error) {
    console.error('Error creating community onboarding:', error);
    throw error;
  }
};

// Update user system role
export const updateUserSystemRole = async (
  userId: string,
  role: UserRole,
  managedCommunities: string[] = []
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      systemRole: role,
      managedCommunities,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user system role:', error);
    throw error;
  }
};
