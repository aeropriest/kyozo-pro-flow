'use client';

import React from 'react';
import styles from './Steps.module.scss';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const DashboardStep: React.FC = () => {
  return (
    <div className={styles.stepContainer}>
      <div className={styles.completionContainer}>
        <div className={styles.completionIcon}>
          <IoMdCheckmarkCircleOutline size={80} />
        </div>
        <h2 className={styles.completionTitle}>Congratulations!</h2>
        <p className={styles.completionText}>
          Your community is now set up and ready to go. You can access all features from your dashboard.
        </p>
        <div className={styles.completionStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>1</span>
            <span className={styles.statLabel}>Community</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>4</span>
            <span className={styles.statLabel}>Members</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>7</span>
            <span className={styles.statLabel}>Steps Completed</span>
          </div>
        </div>
        <button className={styles.dashboardButton}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DashboardStep;
