import type { ReactNode } from 'react';

interface QuantumLayoutProps {
  children: ReactNode;
  variant?: 'row' | 'grid' | 'stack';
  balance?: 'left' | 'right' | 'even';
  spacing?: 'compact' | 'normal' | 'wide';
  className?: string;
}

const spacingMap = {
  compact: 'gap-2 md:gap-3',
  normal: 'gap-4 md:gap-6',
  wide: 'gap-6 md:gap-8'
};

const balanceMap = {
  left: 'grid-cols-1 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr]',
  right: 'grid-cols-1 md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_2fr]',
  even: 'grid-cols-1 md:grid-cols-2'
};

export function QuantumLayout({ 
  children, 
  variant = 'row',
  balance = 'even',
  spacing = 'normal',
  className = ''
}: QuantumLayoutProps) {
  const spacingClass = spacingMap[spacing];

  if (variant === 'row') {
    return (
      <div className={`grid ${balanceMap[balance]} ${spacingClass} ${className}`}>
        {children}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${spacingClass} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${spacingClass} ${className}`}>
      {children}
    </div>
  );
} 