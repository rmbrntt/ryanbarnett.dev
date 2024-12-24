import React from 'react';
import type { ReactNode } from 'react';
import { QuantumSubstrate } from '../lab/QuantumSubstrate';

interface QuantumContentLayoutProps {
  children: ReactNode;
}

export function QuantumContentLayout({ children }: QuantumContentLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <QuantumSubstrate />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}