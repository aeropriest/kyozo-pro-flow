'use client';
import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'outline-only' | 'solid';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  href?: string;
  className?: string;
  fullWidth?: boolean; // Add fullWidth prop
  // Remove index signature to avoid type conflicts
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  onClick,
  href,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`;
  
  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
