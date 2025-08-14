"use client";

import React from 'react';
import styles from './SlidingCards.module.scss';

interface CardProps {
  title: string;
  text: string;
  color: 'blue' | 'green' | 'purple' | 'rose';
}

const Card: React.FC<CardProps> = ({ title, text, color }) => {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardText}>{text}</p>
      </div>
    </div>
  );
};

export default Card;
