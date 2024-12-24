import React from 'react';
import { useStore } from '@nanostores/react';
import { themeStore, updateTheme, type Theme } from '../stores/theme';
import { motion, AnimatePresence } from 'framer-motion';

const iconVariants = {
  initial: { opacity: 0, rotate: -30, scale: 0.3 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 30, scale: 0.3 }
};

const buttonVariants = {
  initial: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  hover: { backgroundColor: 'rgba(136, 208, 243, 0.05)' },
  tap: { scale: 0.95 }
};

export function ThemeToggle() {
  const theme = useStore(themeStore);

  return (
    <motion.button
      className="relative h-9 w-9 rounded-md flex items-center justify-center transition-colors"
      onClick={() => {
        const nextTheme = {
          light: 'dark',
          dark: 'system',
          system: 'light'
        }[theme] as Theme;
        updateTheme(nextTheme);
      }}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      aria-label={`Current theme: ${theme}. Click to cycle themes.`}
    >
      <AnimatePresence mode="wait">
        {theme === 'light' && (
          <motion.svg
            key="light"
            className="h-4 w-4 text-quantum-primary"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
            />
          </motion.svg>
        )}

        {theme === 'dark' && (
          <motion.svg
            key="dark"
            className="h-4 w-4 text-quantum-primary"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646"
            />
          </motion.svg>
        )}

        {theme === 'system' && (
          <motion.svg
            key="system"
            className="h-4 w-4 text-quantum-primary"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
} 