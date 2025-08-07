'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Button from './Button';
import Dialog from './Dialog';
import Input from './Input';
import Checkbox from './Checkbox';
import styles from './Footer.module.scss';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  newsletter: boolean;
  whatsapp: boolean;
}

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
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
    <footer className={`${styles.footer} ${className}`}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <div className={styles.logoContainer}>
            <Image 
              src="/logo.png" 
              alt="Kyozo Logo" 
              width={150} 
              height={50} 
              className={styles.logo}
            />
          </div>
        </div>
        
        <div className={styles.navSection}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a href="#" className={styles.navLink}>Home</a>
              </li>
              <li className={styles.navItem}>
                <a href="#" className={styles.navLink}>Features</a>
              </li>
              <li className={styles.navItem}>
                <a href="#" className={styles.navLink}>About</a>
              </li>
              <li className={styles.navItem}>
                <a href="#" className={styles.navLink}>Contact</a>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className={styles.ctaSection}>
          <div className={styles.logoButtonContainer}>
            <Image 
              src="/logo.png" 
              alt="Kyozo Logo" 
              width={100} 
              height={30} 
              className={styles.buttonLogo}
            />
            <Button 
              variant="primary" 
              onClick={openDialog}
              className={styles.joinButton}
            >
              Join
            </Button>
          </div>
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
      
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Kyozo. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              Twitter
            </a>
            <a href="#" className={styles.socialLink}>
              Instagram
            </a>
            <a href="#" className={styles.socialLink}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
