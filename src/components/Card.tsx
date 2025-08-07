"use client";

import React from 'react';

interface CardProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'blue' | 'green' | 'purple' | 'rose';
}

const Card: React.FC<CardProps> = ({ title, className = '', children, variant }) => {
  const cardClass = variant ? `card card--${variant}` : 'card';
  
  return (
    <div className={`${cardClass} ${className}`}>
      <div className="card__content">
        <h2 className="card__title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Card;
