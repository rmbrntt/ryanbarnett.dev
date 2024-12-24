import React from 'react';
import { useStore } from '@nanostores/react';
import { themeStore } from '../../stores/theme';
import type { QuantumTheme } from './QuantumContainer.ts';
import { quantumThemes } from './QuantumContainer.ts';

interface QuantumContainerProps {
  children: React.ReactNode;
  theme?: QuantumTheme;
}

export function QuantumContainer({ children, theme }: QuantumContainerProps) {
  // Default theme to use during SSR or when no theme is provided
  const defaultTheme = {
    colors: {
      ...quantumThemes.cyan.colors
    }
  };

  // Only use the store on the client side
  const currentTheme = typeof window !== 'undefined' ? useStore(themeStore) : null;
  const effectiveTheme = theme || defaultTheme;

  if (!effectiveTheme || !effectiveTheme.colors) {
    console.warn('QuantumContainer: No theme provided');
    return <>{children}</>;
  }

  const style = {
    '--quantum-primary': effectiveTheme.colors.primary,
    '--quantum-secondary': effectiveTheme.colors.secondary,
    '--quantum-bg': effectiveTheme.colors.bg,
    '--quantum-border': effectiveTheme.colors.border,
    '--quantum-glow': effectiveTheme.colors.glow,
    '--quantum-text': effectiveTheme.colors.text,
    '--quantum-accent': effectiveTheme.colors.accent,
    '--quantum-muted': effectiveTheme.colors.muted,
    '--quantum-background': effectiveTheme.colors.background,
    '--quantum-foreground': effectiveTheme.colors.foreground,
  } as React.CSSProperties;

  return (
    <div className="quantum-container" style={style}>
      {children}
    </div>
  );
}