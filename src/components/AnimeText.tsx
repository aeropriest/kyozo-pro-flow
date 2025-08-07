'use client';

import React, { useState, useEffect, CSSProperties } from 'react';

interface AnimeTextProps {
  text: string;
  fontSize?: string;
  fontWeight?: number;
}

const AnimeText: React.FC<AnimeTextProps> = ({ text, fontSize = '7rem', fontWeight = 800 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const words = text.split(' ');
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212',
      position: 'absolute',
      top: 0,
      left: 0
    }}>
      <h1 style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        textAlign: 'center',
        maxWidth: '1200px',
        padding: '0 2rem',
        margin: 0
      }}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} style={{ display: 'inline-block', margin: '0 0.2rem' }}>
            {word.split('').map((letter, letterIndex) => {
              const letterStyle: CSSProperties = {
                display: 'inline-block',
                color: '#444444', // Initial gray color
                transition: 'color 0.5s ease',
                transitionDelay: `${(wordIndex * word.length + letterIndex) * 0.05}s`,
                ...(isLoaded && { color: '#ffffff' }) // Animate to white when loaded
              };
              
              return (
                <span
                  key={`${wordIndex}-${letterIndex}`}
                  style={letterStyle}
                >
                  {letter}
                </span>
              );
            })}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default AnimeText;
