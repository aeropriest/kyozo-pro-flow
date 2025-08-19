'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button as ButtonUI } from "@/components/ui";
import styles from './FixedFooter.module.scss';
import Dialog from '../Dialog';

interface FixedFooterProps {
  className?: string;
}

const FixedFooter: React.FC<FixedFooterProps> = ({ className = '' }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className={`${styles.fixedFooter} ${className}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Kyozo Logo"
            width={32}
            height={32}
            priority
          />
          <span>Kyozo</span>
        </div>
        
        <div className={styles.cta}>
          <ButtonUI
            variant="primary"
            size="small"
            onClick={openDialog}
            className={styles.ctaButton}
          >
            Get Started
          </ButtonUI>
        </div>
      </div>

      <Dialog isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default FixedFooter;
