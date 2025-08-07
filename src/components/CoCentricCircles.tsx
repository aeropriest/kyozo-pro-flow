'use client';
import React from 'react';
import styles from './CoCentricCircles.module.scss';

const CoCentricCircles = () => {
  // Array of rings for rendering with index to stagger animation & styles
  const rings = [1, 2, 3, 4, 5];

  return (
    <div className={styles.container}>
      <div className={styles.animatedConcentricRings}>
        {rings.map((ring, index) => (
          <div 
            key={ring} 
            className={styles[`ring${ring}`]} 
            style={{
              animationDelay: `${index * 0.5}s`,
              opacity: 1 - index * 0.175,  // from 1 to 0.3 opacity approximately
              transformOrigin: 'center',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CoCentricCircles;
