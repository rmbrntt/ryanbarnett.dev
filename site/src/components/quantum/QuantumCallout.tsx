import React from 'react';
import clsx from 'clsx';
import type { QuantumTheme } from '../markdoc/QuantumContainer';
import { quantumThemes } from '../markdoc/QuantumContainer';

type CalloutVariant = 'quantum' | 'field' | 'system' | 'neural' | 'void' | 'deep';

interface QuantumCalloutProps {
  variant?: CalloutVariant;
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

// Define our callout styles based on the variant
const calloutStyles: Record<CalloutVariant, {
  theme: QuantumTheme;
  icon: string;
  lightBg: string;
  darkBg: string;
}> = {
  quantum: {
    theme: quantumThemes.cyan,
    icon: '⚡',
    lightBg: 'bg-[#88d0f3]/10',
    darkBg: 'dark:bg-[#88d0f3]/5'
  },
  field: {
    theme: quantumThemes.purple,
    icon: '◐',
    lightBg: 'bg-[#c596fc]/10',
    darkBg: 'dark:bg-[#c596fc]/5'
  },
  system: {
    theme: quantumThemes.green,
    icon: '∿',
    lightBg: 'bg-[#59a066]/10',
    darkBg: 'dark:bg-[#59a066]/5'
  },
  neural: {
    theme: quantumThemes.red,
    icon: '◈',
    lightBg: 'bg-[#d14554]/10',
    darkBg: 'dark:bg-[#d14554]/5'
  },
  void: {
    theme: quantumThemes.yellow,
    icon: '◇',
    lightBg: 'bg-[#10cdb8e]/10',
    darkBg: 'dark:bg-[#10cdb8e]/5'
  },
  deep: {
    theme: quantumThemes.deep,
    icon: '◆',
    lightBg: 'bg-[#88409a]/10',
    darkBg: 'dark:bg-[#88409a]/5'
  }
};

export function QuantumCallout({
  variant = 'quantum',
  icon,
  title,
  children,
  className
}: QuantumCalloutProps) {
  const style = calloutStyles[variant];
  
  return (
    <div 
      className={clsx(
        'rounded-lg overflow-hidden',
        'transition-colors duration-300',
        style.lightBg,
        style.darkBg,
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-none text-2xl">
            {icon || style.icon}
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-medium">
              {title}
            </h3>
            <div className="prose dark:prose-invert">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}