'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Button from './Button';
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
      
      {/* Dialog component */}
      <Dialog 
        isOpen={isDialogOpen} 
        onClose={closeDialog}
        title="Join the waitlist"
        showTabs={true}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className={styles.waitlistDialog}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <Input
              name="firstName"
              placeholder="Firstname *"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
            
            <Input
              name="lastName"
              placeholder="Lastname *"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.formRow}>
            <Input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles.input}
            />
            
            <Input
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          
          <div>
            <Checkbox
              name="newsletter"
              label="Subscribe to newsletter"
              checked={formData.newsletter}
              onChange={handleCheckboxChange}
              className={styles.checkbox}
            />
            
            <Checkbox
              name="whatsapp"
              label="Receive updates via WhatsApp"
              checked={formData.whatsapp}
              onChange={handleCheckboxChange}
              className={styles.checkbox}
            />
          </div>
          
          <Button 
            variant="primary"
            type="submit"
            className={styles.submitButton}
          >
            Join Waitlist
          </Button>
        </form>
      </Dialog>
    </footer>
  );
};

export default FixedFooter;
