// Bubble row colors using the global color palette
// These values should match the SCSS color variables in _colors.scss
export const bubbleRowColors = {
  // Using colors from _colors.scss - keep in sync with primary colors
  music: '#4169e1',        // primary('accent-blue')
  artMovements: '#D3439A', // primary('accent-pink')
  crafts: '#ffbf00',       // primary('accent-yellow')
  fashion: '#ff8a65',      // primary('accent-coral')
  performance: '#86efac',  // primary('accent-mint')
};

// Common colors that match _colors.scss
export const colors = {
  // Primary colors
  background: '#000000',           // primary('background-color')
  backgroundLighter: '#181818',    // primary('lighter-background-color')
  textDark: '#ff0000',            // primary('dark-text-color') - TESTING: Final red test
  
  // Standard colors
  white: '#ff0000',               // standard('white') - TESTING: Final red test
  black: '#000000',               // common('black')
  
  // Accent colors
  accentBlue: '#4169e1',          // primary('accent-blue')
  accentPink: '#D3439A',          // primary('accent-pink')
  accentYellow: '#ffbf00',        // primary('accent-yellow')
  accentMint: '#86efac',          // primary('accent-mint')
  accentCoral: '#ff8a65',         // primary('accent-coral')
};
