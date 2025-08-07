'use client';

import React from 'react';
import ScrollRevealText from '@/components/ScrollRevealText';

export default function ScrollRevealDemo() {
  return (
    <div style={{ 
      backgroundColor: '#121212', 
      color: '#ffffff',
      minHeight: '300vh' // Make page scrollable
    }}>
      {/* Spacer to ensure we have to scroll to see the component */}
      <div style={{ height: '50vh' }}></div>
      
      <ScrollRevealText 
        text="This text reveals as you scroll down and hides as you scroll up"
        fontSize="3.5rem"
        fontWeight={700}
        revealSpeed={0.7} // Adjust for faster/slower reveal
      />
      
      {/* Another instance with different text and settings */}
      <div style={{ marginTop: '100vh' }}>
        <ScrollRevealText 
          text="Scroll controls the animation direction"
          fontSize="2.5rem"
          fontWeight={600}
          revealSpeed={0.4} // More sensitive to scroll
        />
      </div>
      
      {/* Spacer at the bottom */}
      <div style={{ height: '50vh' }}></div>
    </div>
  );
}
