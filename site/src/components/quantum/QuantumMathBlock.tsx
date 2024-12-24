import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { QuantumTheme } from '../markdoc/QuantumContainer.tsx';
import { MathComponent } from '../markdoc/Math';

interface QuantumMathBlockProps {
  title?: string;
  math: string;
  description?: string;
  theme: QuantumTheme;
  className?: string;
}

export function QuantumMathBlock({
  title,
  math,
  description,
  theme,
  className
}: QuantumMathBlockProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-lg backdrop-blur-sm',
        className
      )}
      style={{
        backgroundColor: `${theme.colors.bg}10`,
        borderColor: `${theme.colors.border}20`,
        boxShadow: `0 0 30px ${theme.colors.glow}`
      }}
    >
      {title && (
        <p 
          className="font-mono mb-4"
          style={{ color: theme.colors.text }}
        >
          {title}
        </p>
      )}
      <MathComponent block math={math} />
      {description && (
        <p 
          className="mt-4"
          style={{ color: theme.colors.text }}
        >
          {description}
        </p>
      )}
    </div>
  );
}