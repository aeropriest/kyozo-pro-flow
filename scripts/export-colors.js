const fs = require('fs');
const path = require('path');
const sass = require('sass');

// Function to export SCSS variables to TypeScript
function exportColorsToTypeScript() {
  const scssFilePath = path.join(__dirname, '../src/styles/_colors.scss');
  const outputPath = path.join(__dirname, '../src/lib/colors.generated.ts');
  
  // Create a temporary SCSS file that exports our color variables
  const tempScssContent = `
@use 'sass:map';
@use '../src/styles/_colors.scss' as colors;

// Export variables as CSS custom properties so we can extract them
:export {
  // Primary colors
  darkTextColor: #{map.get(colors.$colors-primary, 'dark-text-color')};
  backgroundColor: #{map.get(colors.$colors-primary, 'background-color')};
  backgroundLighter: #{map.get(colors.$colors-primary, 'lighter-background-color')};
  
  // Standard colors  
  white: #{map.get(colors.$colors-standard, 'white')};
  
  // Common colors
  black: #{map.get(colors.$colors-common, 'black')};
  
  // Accent colors
  accentTeal: #{map.get(colors.$colors-primary, 'accent-teal')};
  accentOrange: #{map.get(colors.$colors-primary, 'accent-orange')};
  accentPurple: #{map.get(colors.$colors-primary, 'accent-purple')};
  accentBlue: #{map.get(colors.$colors-primary, 'accent-blue')};
  
  // Background colors
  pageBackground: #{map.get(colors.$colors-backgrounds, 'page')};
  mainBackground: #{map.get(colors.$colors-backgrounds, 'main')};
  lighterBackground: #{map.get(colors.$colors-backgrounds, 'lighter')};
  mediumBackground: #{map.get(colors.$colors-backgrounds, 'medium')};
  overlayBackground: #{map.get(colors.$colors-backgrounds, 'overlay')};
  glassBackground: #{map.get(colors.$colors-backgrounds, 'glass')};
  inputBackground: #{map.get(colors.$colors-backgrounds, 'input')};
  inputHoverBackground: #{map.get(colors.$colors-backgrounds, 'input-hover')};
  
  // Card colors
  cardBackground: #{map.get(colors.$colors-cards, 'background')};
  cardBorder: #{map.get(colors.$colors-cards, 'border')};
  cardShadow: #{map.get(colors.$colors-cards, 'shadow')};
  cardHover: #{map.get(colors.$colors-cards, 'hover')};
  
  // Border colors
  borderDefault: #{map.get(colors.$colors-borders, 'default')};
  borderLight: #{map.get(colors.$colors-borders, 'light')};
  borderMedium: #{map.get(colors.$colors-borders, 'medium')};
  borderAccent: #{map.get(colors.$colors-borders, 'accent')};
  borderTransparent: #{map.get(colors.$colors-borders, 'transparent')};
}
`;

  const tempScssPath = path.join(__dirname, 'temp-colors.scss');
  fs.writeFileSync(tempScssPath, tempScssContent);
  
  try {
    // Compile SCSS to CSS
    const result = sass.compile(tempScssPath);
    const css = result.css;
    
    // Extract the :export values using regex
    const exportMatch = css.match(/:export\s*{([^}]+)}/);
    if (!exportMatch) {
      throw new Error('Could not find :export block in compiled CSS');
    }
    
    const exportBlock = exportMatch[1];
    const colorEntries = {};
    
    // Parse each color declaration
    const declarations = exportBlock.split(';').filter(decl => decl.trim());
    declarations.forEach(decl => {
      const [property, value] = decl.split(':').map(s => s.trim());
      if (property && value) {
        colorEntries[property] = value;
      }
    });
    
    // Generate TypeScript file
    const tsContent = `// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// This file is generated from _colors.scss by scripts/export-colors.js
// To update colors, modify src/styles/_colors.scss and run: npm run export-colors

export const colors = {
  // Primary colors
  background: '${colorEntries.backgroundColor}',
  backgroundLighter: '${colorEntries.backgroundLighter}',
  textDark: '${colorEntries.darkTextColor}',
  
  // Standard colors
  white: '${colorEntries.white}',
  black: '${colorEntries.black}',
  
  // Accent colors
  accentTeal: '${colorEntries.accentTeal}',
  accentOrange: '${colorEntries.accentOrange}',
  accentPurple: '${colorEntries.accentPurple}',
  accentBlue: '${colorEntries.accentBlue}',
  
  // Background colors
  pageBackground: '${colorEntries.pageBackground}',
  mainBackground: '${colorEntries.mainBackground}',
  lighterBackground: '${colorEntries.lighterBackground}',
  mediumBackground: '${colorEntries.mediumBackground}',
  overlayBackground: '${colorEntries.overlayBackground}',
  glassBackground: '${colorEntries.glassBackground}',
  inputBackground: '${colorEntries.inputBackground}',
  inputHoverBackground: '${colorEntries.inputHoverBackground}',
  
  // Card colors
  cardBackground: '${colorEntries.cardBackground}',
  cardBorder: '${colorEntries.cardBorder}',
  cardShadow: '${colorEntries.cardShadow}',
  cardHover: '${colorEntries.cardHover}',
  
  // Border colors
  borderDefault: '${colorEntries.borderDefault}',
  borderLight: '${colorEntries.borderLight}',
  borderMedium: '${colorEntries.borderMedium}',
  borderAccent: '${colorEntries.borderAccent}',
  borderTransparent: '${colorEntries.borderTransparent}',
} as const;

export type ColorKey = keyof typeof colors;
`;

    // Write the generated TypeScript file
    fs.writeFileSync(outputPath, tsContent);
    console.log('✅ Colors exported successfully to', outputPath);
    
    // Clean up temp file
    fs.unlinkSync(tempScssPath);
    
  } catch (error) {
    console.error('❌ Error exporting colors:', error);
    // Clean up temp file even on error
    if (fs.existsSync(tempScssPath)) {
      fs.unlinkSync(tempScssPath);
    }
    process.exit(1);
  }
}

// Run the export
exportColorsToTypeScript();
