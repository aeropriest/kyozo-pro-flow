'use client';

import React, { useEffect, useState } from 'react';
import styles from './HeroGradient.module.scss';

interface HeroGradientProps {
  className?: string;
}

const HeroGradient: React.FC<HeroGradientProps> = ({ className = '' }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Animate the gradient to appear with increasing opacity
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`${styles.heroGradient} ${className}`} 
      style={{ opacity }}
    />
  );
};

export default HeroGradient;
