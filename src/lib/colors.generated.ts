// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// This file is generated from _colors.scss by scripts/export-colors.js
// To update colors, modify src/styles/_colors.scss and run: npm run export-colors

export const colors = {
  // Primary colors
  background: '#111111',
  backgroundLighter: '#181818',
  textDark: '#ffffff',
  textSecondary: '#313131',
  
  // Standard colors
  white: '#ff0000',
  black: '#000000',
  
  // Accent colors
  accentTeal: '#20c997',
  accentOrange: '#fd7e14',
  accentPurple: '#b19cd9',
  accentBlue: '#4169e1',
  
  // Background colors
  pageBackground: '#111111',
  mainBackground: '#111111',
  lighterBackground: '#181818',
  mediumBackground: '#313131',
  overlayBackground: 'rgba(0, 0, 0, 0.5)',
  glassBackground: 'rgba(38, 38, 38, 0.3)',
  inputBackground: 'rgba(255, 255, 255, 0.05)',
  inputHoverBackground: 'rgba(255, 255, 255, 0.08)',
  
  // Card colors
  cardBackground: '#181818',
  cardBorder: '#313131',
  cardShadow: 'rgba(0, 0, 0, 0.2)',
  cardHover: 'rgba(255, 255, 255, 0.05)',
  
  // Border colors
  borderDefault: 'rgba(255, 255, 255, 0.1)',
  borderLight: 'rgba(255, 255, 255, 0.2)',
  borderMedium: '#313131',
  borderAccent: '#D3439A',
  borderTransparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;
