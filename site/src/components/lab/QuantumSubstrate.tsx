import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { themeStore } from '../../stores/theme';
import { generateQuantumGradient } from '../../lib/theme/generator';

interface QuantumSubstrateProps {
  className?: string;
  mode?: 'reveal' | 'ambient';
  interactive?: boolean;
  coherence?: number;
}

function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const updateDarkMode = () => {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    };

    updateDarkMode();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateDarkMode);

    return () => mediaQuery.removeEventListener('change', updateDarkMode);
  }, []);

  return isDark;
}

export function QuantumSubstrate({ 
  className = '',
  mode = 'ambient',
  interactive = false,
  coherence = 0.5
}: QuantumSubstrateProps) {
  const theme = useStore(themeStore);
  const [mounted, setMounted] = useState(false);
  const isDark = useIsDark();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server side
  if (!mounted || typeof window === 'undefined') {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 -z-10 opacity-30 pointer-events-none mix-blend-screen ${className}`}
      style={{
        background: generateQuantumGradient('cyan', isDark),
        filter: `blur(${100 * (1 - coherence)}px)`,
        opacity: mode === 'reveal' ? 0.4 : 0.3,
        transition: interactive ? 'all 0.5s ease-out' : undefined
      }}
    />
  );
}

export default QuantumSubstrate;