'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Button from './Button';
import DialogX from './DialogX';
import Dialog from './Dialog';
import Input from './Input';
import Checkbox from './Checkbox';
import styles from './FixedFooter.module.scss';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  newsletter: boolean;
  whatsapp: boolean;
}

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

  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    newsletter: true,
    whatsapp: false
  });

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'Kyozo', count: 24 },
    { label: 'KyozoPro', count: 12 }
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsDialogOpen(false);
  };
  
  // Prevent backdrop click from closing dialog when clicking on form elements
  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <footer className={`${styles.fixedFooter} ${className}`}>
      <div className={styles.container}>
        <div className={styles.logoButtonContainer}>
          <Image 
            src="/logo.png" 
            alt="Kyozo Logo" 
            width={100} 
            height={30} 
            className={styles.buttonLogo}
          />
          <Button 
            variant="accent-fill" 
            onClick={openDialog}
            className={styles.joinButton}
            size="small"
          >
            Join
          </Button>
        </div>
      </div>
      
      {/* DialogX component */}
      <Dialog 
        isOpen={isDialogOpen} 
        onClose={closeDialog}
        title="Join Kyozo"
        subtitle="Join Kyozo"
        children={<div>Join Kyozo</div>}
      />
    </footer>
  );
};

export default FixedFooter;
