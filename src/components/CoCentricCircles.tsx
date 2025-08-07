'use client';
import React, { useState, useEffect } from 'react';
import styles from './CoCentricCircles.module.scss';

const CoCentricCircles = () => {
  const [circles, setCircles] = useState<number[]>([]);
  const totalCircles = 5; // Number of circles in the animation
  const circleDuration = 2; // Duration for each circle animation in seconds

  useEffect(() => {
    // Initial set of circles
    const initialCircles = Array.from({ length: totalCircles }, (_, i) => i);
    setCircles(initialCircles);

    // Add a new circle at regular intervals
    const interval = setInterval(() => {
      setCircles(prev => {
        // Remove the oldest circle and add a new one
        const newCircles = [...prev.slice(1), prev[prev.length - 1] + 1];
        return newCircles;
      });
    }, circleDuration * 1000 / 2); // Add new circle every half the animation duration

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.animatedConcentricRings}>
        {circles.map((circleId, index) => (
          <div 
            key={circleId}
            className={styles.circle}
            style={{
              '--delay': `${(index / totalCircles) * circleDuration}s`,
              '--duration': `${circleDuration}s`,
              '--opacity': 1 - (index / totalCircles) * 0.8, // Fade out as circles expand
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
};

export default CoCentricCircles;
