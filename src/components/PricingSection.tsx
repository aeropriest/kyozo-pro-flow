'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { pricingData } from '../data/pricingData';
import PricingCard from './PricingCard';
import styles from './PricingSection.module.scss';
import Button from './Button';

// Dynamically import PriceCircles with SSR disabled to avoid hydration issues
const PriceCircles = dynamic(() => import('./PriceCircles'), {
  ssr: false,
  loading: () => <div className={styles.container} />,
});

const PricingSection = () => {
  return (
    <section className={styles.pricingSection}>
      {/* Background with animated circles */}
      <div className={styles.background}>
        <PriceCircles />
      </div>
      
      {/* Content overlay */}
      <div className={styles.content}>        
        {/* Pricing cards */}
        <div className={styles.pricingGrid}>
          {pricingData.map((data) => (
            <div key={data.title} className={styles.pricingCardWrapper}>
              <PricingCard 
                {...data} 
                features={data.features}
              />
            </div>
          ))}
        </div>
        <Button variant="outline-only" href="#">Join the waitlist</Button>
      </div>
    </section>
  );
};

export default PricingSection;
