'use client';

import React, { useState, useEffect } from 'react';
import styles from './AnimatedTitle.module.scss';

interface AnimatedTitleProps {
  text: string;
  subtitle?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  text,
  subtitle,
  className = '',
  size = 'medium'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`${styles.titleContainer} ${className} ${styles[size]}`}>
      <h1 className={styles.title}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className={styles.word}>
            {word.split('').map((letter, letterIndex) => (
              <span
                key={`${wordIndex}-${letterIndex}`}
                className={`${styles.letter} ${isLoaded ? styles.loaded : ''}`}
                style={{ transitionDelay: `${(wordIndex * word.length + letterIndex) * 0.05}s` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
            {/* Add a space after each word except the last one */}
            {wordIndex < words.length - 1 && <span className={styles.wordSpace}></span>}
          </span>
        ))}
      </h1>
      {subtitle && (
        <p className={`${styles.subtitle} ${isLoaded ? styles.loaded : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AnimatedTitle;
