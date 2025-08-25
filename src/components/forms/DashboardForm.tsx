'use client';

import React, { useState, useEffect } from 'react';
import { AnimatedTitle } from '@/components/ui';
import styles from './FormBase.module.scss';
import dashboardStyles from './DashboardForm.module.scss';
import ButtonUI from '../ui/Button';
import { cards } from '../wizardData';
import { useAuth } from '@/hooks/useAuth';
import { getOnboardingProgress, saveOnboardingProgress, OnboardingProgress } from '@/lib/onboarding';
import { getUserProfile, createUserProfile } from '@/lib/auth';

interface DashboardFormProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

const DashboardForm: React.FC<DashboardFormProps> = ({
  onNext,
  onPrev,
  currentStep = 5,
  totalSteps = 5,
}) => {
  const { user } = useAuth();
  const stepData = cards[4]; // DashboardForm is the fifth card (index 4)

  const [setupComplete, setSetupComplete] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load onboarding data when component mounts
  useEffect(() => {
    const loadOnboardingData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          const progress = await getOnboardingProgress(userProfile.tenantId, user.uid);
          setOnboardingData(progress);
        }
      } catch (error) {
        console.error('Error loading onboarding data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOnboardingData();
  }, [user]);

  const handleFinish = async () => {
    if (!user || !onboardingData) return;

    try {
      // Save dashboard completion
      let userProfile = await getUserProfile(user.uid);
      
      // If no profile exists or no tenantId, create/update profile
      if (!userProfile || !userProfile.tenantId) {
        console.log('🔵 Creating/updating user profile with tenantId');
        userProfile = await createUserProfile(user);
      }
      
      if (userProfile && userProfile.tenantId) {
        await saveOnboardingProgress(
          userProfile.tenantId,
          user.uid,
          'dashboard',
          { setupComplete: true },
          true // Mark as completed
        );
      } else {
        console.error('🔴 Unable to get tenantId for user');
      }
    } catch (error) {
      console.error('Error saving dashboard completion:', error);
    }

    setSetupComplete(true);
    console.log('Community setup completed!');
    onNext?.(); // This will close the dialog
  };

  const handleBack = () => {
    onPrev?.();
  };

  const handleSkip = () => {
    onNext?.();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.topSection}>
        <p className={styles.categoryLabel}>Step {currentStep} of {totalSteps}</p>
        <AnimatedTitle
          text={stepData.title}
          subtitle={stepData.description}
          size="large"
          className={styles.animatedTitle}
        />
      </div>

      {/* Middle Section: Summary of saved data */}
      <div className={styles.middleSection}>
        {isLoading ? (
          <div className={dashboardStyles.loadingState}>
            <div className={dashboardStyles.spinner}></div>
            <p>Loading your onboarding data...</p>
          </div>
        ) : onboardingData ? (
          <div className={dashboardStyles.summaryContainer}>
            <h3 className={dashboardStyles.summaryTitle}>🎉 Setup Complete!</h3>
            
            {/* Account Information */}
            {onboardingData.stepData.auth && (
              <div className={dashboardStyles.summarySection}>
                <h4 className={dashboardStyles.sectionTitle}>👤 Account Information</h4>
                <div className={dashboardStyles.dataGrid}>
                  <div className={dashboardStyles.dataItem}>
                    <span className={dashboardStyles.label}>Email:</span>
                    <span className={dashboardStyles.value}>{onboardingData.stepData.auth.email}</span>
                  </div>
                  <div className={dashboardStyles.dataItem}>
                    <span className={dashboardStyles.label}>Display Name:</span>
                    <span className={dashboardStyles.value}>{onboardingData.stepData.auth.displayName}</span>
                  </div>
                  <div className={dashboardStyles.dataItem}>
                    <span className={dashboardStyles.label}>Sign-in Method:</span>
                    <span className={dashboardStyles.value}>{onboardingData.stepData.auth.authMethod}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Avatar Data */}
            {onboardingData.stepData.avatar && (
              <div className={dashboardStyles.summarySection}>
                <h4 className={dashboardStyles.sectionTitle}>🖼️ Profile Setup</h4>
                <div className={dashboardStyles.dataGrid}>
                  <div className={dashboardStyles.dataItem}>
                    <span className={dashboardStyles.label}>Display Name:</span>
                    <span className={dashboardStyles.value}>{onboardingData.stepData.avatar.displayName}</span>
                  </div>
                  {onboardingData.stepData.avatar.avatarUrl && (
                    <div className={dashboardStyles.dataItem}>
                      <span className={dashboardStyles.label}>Avatar:</span>
                      <img 
                        src={onboardingData.stepData.avatar.avatarUrl} 
                        alt="Avatar" 
                        className={dashboardStyles.avatarPreview}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Community Details */}
            {onboardingData.stepData.community_details && (
              <div className={dashboardStyles.summarySection}>
                <h4 className={dashboardStyles.sectionTitle}>🏘️ Community Details</h4>
                <div className={dashboardStyles.dataGrid}>
                  <div className={dashboardStyles.dataItem}>
                    <span className={dashboardStyles.label}>Community Name:</span>
                    <span className={dashboardStyles.value}>{onboardingData.stepData.community_details.communityName}</span>
                  </div>
                  <div className={dashboardStyles.dataItem}>
                    <span className={dashboardStyles.label}>Description:</span>
                    <span className={dashboardStyles.value}>{onboardingData.stepData.community_details.communityDescription}</span>
                  </div>
                  <div className={dashboardStyles.dataItem}>
                    <span className={dashboardStyles.label}>Privacy:</span>
                    <span className={dashboardStyles.value}>
                      {onboardingData.stepData.community_details.isPrivate ? '🔒 Private' : '🌐 Public'}
                    </span>
                  </div>
                  {onboardingData.stepData.community_details.communityColor && (
                    <div className={dashboardStyles.dataItem}>
                      <span className={dashboardStyles.label}>Theme Color:</span>
                      <span className={dashboardStyles.colorPreview}>
                        <div 
                          className={dashboardStyles.colorSwatch}
                          style={{ backgroundColor: onboardingData.stepData.community_details.communityColor }}
                        ></div>
                        {onboardingData.stepData.community_details.communityColor}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Members Data with Table */}
            {onboardingData.stepData.add_members && (
              <div className={dashboardStyles.summarySection}>
                <h4 className={dashboardStyles.sectionTitle}>👥 Team Members</h4>
                <div className={dashboardStyles.dataGrid}>
                  <div className={dashboardStyles.dataItem}>
                    <span className={dashboardStyles.label}>Import Method:</span>
                    <span className={dashboardStyles.value}>{onboardingData.stepData.add_members.inviteMethod || 'Not specified'}</span>
                  </div>
                  <div className={dashboardStyles.dataItem}>
                    <span className={dashboardStyles.label}>Total Members:</span>
                    <span className={dashboardStyles.value}>
                      {onboardingData.stepData.add_members.invitedMembers?.length || 0} members
                    </span>
                  </div>
                </div>
                
                {/* Members Table */}
                {onboardingData.stepData.add_members.invitedMembers && 
                 onboardingData.stepData.add_members.invitedMembers.length > 0 && (
                  <div className={dashboardStyles.membersTable}>
                    <h5 className={dashboardStyles.tableTitle}>Imported Member Data</h5>
                    <div className={dashboardStyles.tableContainer}>
                      <table className={dashboardStyles.table}>
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {onboardingData.stepData.add_members.invitedMembers.map((member, index) => (
                            <tr key={index}>
                              <td>{member.email}</td>
                              <td>{member.name || 'N/A'}</td>
                              <td>
                                <span className={dashboardStyles.roleBadge}>
                                  {member.role}
                                </span>
                              </td>
                              <td>
                                <span className={dashboardStyles.statusBadge}>
                                  Pending
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Progress Summary */}
            <div className={dashboardStyles.summarySection}>
              <h4 className={dashboardStyles.sectionTitle}>📊 Setup Progress</h4>
              <div className={dashboardStyles.progressGrid}>
                <div className={dashboardStyles.progressItem}>
                  <span className={dashboardStyles.label}>Completed Steps:</span>
                  <span className={dashboardStyles.value}>{onboardingData.completedSteps.length} / 5</span>
                </div>
                <div className={dashboardStyles.progressBar}>
                  <div 
                    className={dashboardStyles.progressFill}
                    style={{ width: `${(onboardingData.completedSteps.length / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={dashboardStyles.nextSteps}>
              <h4 className={dashboardStyles.nextStepsTitle}>🚀 Ready to Launch!</h4>
              <p className={dashboardStyles.launchMessage}>
                All your data has been saved securely. Your community is ready to go live!
              </p>
            </div>
          </div>
        ) : (
          <div className={dashboardStyles.noDataState}>
            <h3 className={dashboardStyles.summaryTitle}>No onboarding data found</h3>
            <p>Please complete the previous steps to see your summary.</p>
          </div>
        )}
      </div>

      {/* Bottom Section: Action buttons */}
      <div className={styles.bottomSection}>
        <div className={styles.actionRow}>
          <ButtonUI 
            variant="outline-only" 
            size="medium" 
            onClick={handleBack} 
            fullWidth
          >
            Back
          </ButtonUI>
          <ButtonUI 
            variant="primary" 
            size="medium" 
            onClick={handleFinish}
            fullWidth
          >
            Launch
          </ButtonUI>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm;
