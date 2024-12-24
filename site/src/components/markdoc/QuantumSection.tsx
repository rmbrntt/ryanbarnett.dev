import React from 'react';
import clsx from 'clsx';
import { QuantumContainer } from './QuantumContainer.tsx';
import type { QuantumTheme } from './QuantumContainer.ts';
import { quantumThemes } from './QuantumContainer.ts';

interface QuantumSectionProps {
  title: string;
  theme?: QuantumTheme;
  icon?: string;
  className?: string;
  children: React.ReactNode;
}

export function QuantumSection({
  title,
  theme = quantumThemes.cyan,
  icon,
  className,
  children
}: QuantumSectionProps) {
  return (
    <section className={clsx('my-16', className)}>
      <h2 className={clsx(
        'quantum-text text-2xl font-bold mb-6 flex items-center gap-2',
        'text-quantum-text'
      )}>
        {icon} {title}
      </h2>
      <div className="space-y-8">
        {children}
      </div>
    </section>
  );
}