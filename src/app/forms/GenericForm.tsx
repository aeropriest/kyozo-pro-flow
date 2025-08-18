'use client';

import React from 'react';
import styles from './GenericForm.module.scss';

interface GenericFormProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actionButtons: React.ReactNode; // Buttons rendered at the bottom
}

const GenericForm: React.FC<GenericFormProps> = ({
  title,
  description,
  children,
  actionButtons,
}) => {
  return (
    <div className={styles.formContainer}>
      {/* Top section: Title, subtitle, counter - top aligned with red background */}
      <div className={styles.topSection}>
        <h2 className={styles.formTitle}>{title}</h2>
        {description && <p className={styles.formDescription}>{description}</p>}
      </div>

      {/* Middle section: Form controls with 7px gap */}
      <div className={styles.middleSection}>
        <div className={styles.formFields}>{children}</div>
      </div>

      {/* Bottom section: Action buttons - bottom aligned with green background */}
      <div className={styles.bottomSection}>
        <div className={styles.actionRow}>{actionButtons}</div>
      </div>
    </div>
  );
};

export default GenericForm;
