'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Dialog from './Dialog';
import Input from './Input';
import Checkbox from './Checkbox';
import Button from './Button';
import styles from './CreativeLab.module.scss';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  newsletter: boolean;
  whatsapp: boolean;
}

interface CreativeLabProps {
  className?: string;
}

const CreativeLab: React.FC<CreativeLabProps> = ({ className = '' }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    newsletter: true,
    whatsapp: false
  });

  const tabs = ['Kyozo', 'KyozoPro'];

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

  return (
    <div className={`${styles.container} ${className}`}>
      <Button onClick={() => setIsDialogOpen(true)} variant="primary">
        Join the waitlist
      </Button>
      
      <Dialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
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
          
          <Input
            name="phone"
            type="tel"
            placeholder="Phone *"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          
          <Input
            name="email"
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          
          <Checkbox
            name="newsletter"
            label="Sign me up to the CreativeLab newsletter"
            checked={formData.newsletter}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          
          <Checkbox
            name="whatsapp"
            label="By submitting this form I agree to be contacted via WhatsApp"
            checked={formData.whatsapp}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          
          <Button type="submit" variant="primary" className={styles.submitButton}>
            Submit
          </Button>
        </form>
      </Dialog>
    </div>
  );
};

export default CreativeLab;
