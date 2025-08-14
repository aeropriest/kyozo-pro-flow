'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface SVGProps {
  className?: string;
}

const BottomRightSVG: React.FC<SVGProps> = ({ className }) => {
  const { theme } = useTheme();
  
  // Colors based on theme
  const primaryColor = theme === 'light' ? '#333' : '#e0e0e0';
  const secondaryColor = theme === 'light' ? '#555' : '#aaa';
  const accentColor = theme === 'light' ? '#0070f3' : '#3694ff';
  
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Abstract decorative shape for bottom right */}
      <path 
        d="M190,100 Q150,50 100,80 T20,30" 
        stroke={primaryColor} 
        strokeWidth="3" 
        fill="none" 
      />
      <circle cx="180" cy="150" r="15" fill={accentColor} opacity="0.7" />
      <circle cx="150" cy="120" r="8" fill={secondaryColor} opacity="0.5" />
      <path 
        d="M170,180 Q120,160 80,190" 
        stroke={primaryColor} 
        strokeWidth="2" 
        fill="none" 
      />
      <rect x="110" y="140" width="20" height="20" fill={accentColor} opacity="0.3" />
      <path 
        d="M200,200 Q160,170 120,200" 
        stroke={secondaryColor} 
        strokeWidth="3" 
        fill="none" 
      />
    </svg>
  );
};

export default BottomRightSVG;
