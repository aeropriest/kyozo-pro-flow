'use client';

import { ThemeProvider } from '../context/ThemeContext';
import SimpleThemeToggle from './SimpleThemeToggle';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <ThemeProvider>
      {children}
      <SimpleThemeToggle />
    </ThemeProvider>
  );
}
