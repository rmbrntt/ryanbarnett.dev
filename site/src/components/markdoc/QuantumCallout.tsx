import React from 'react';
import clsx from 'clsx';

type CalloutType = 'quantum' | 'field' | 'system';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variants = {
  quantum: {
    colors: {
      bg: "#88d0f3", // Quantum Cyan
      border: "#00FFFF",
      glow: "rgb(0 255 255 / 0.2)",
    },
    icon: '⚡',
  },
  field: {
    colors: {
      bg: "#c596fc", // Astral Purple
      border: "#8B1FFF",
      glow: "rgb(139 31 255 / 0.2)",
    },
    icon: '◐',
  },
  system: {
    colors: {
      bg: "#59a066", // Matrix Green
      border: "#59a066",
      glow: "rgb(89 160 102 / 0.2)",
    },
    icon: '∿',
  },
};

export function QuantumCallout({ type = 'quantum', title, children, className }: CalloutProps) {
  const theme = variants[type];
  
  return (
    <div 
      className={clsx(
        'relative overflow-hidden my-6 p-6 rounded-lg border',
        'backdrop-blur-sm bg-opacity-10 dark:bg-opacity-10',
        'transition-all duration-300',
        className
      )}
      style={{
        backgroundColor: theme.colors.bg,
        borderColor: theme.colors.border,
        boxShadow: `0 0 30px ${theme.colors.glow}`,
      }}
    >
      <div className="relative z-10 flex gap-4">
        <div 
          className="flex-none text-2xl mt-1"
          style={{ textShadow: `0 0 10px ${theme.colors.glow}` }}
        >
          {theme.icon}
        </div>
        <div className="flex-1">
          {title && (
            <div className="font-medium mb-2 text-lg">{title}</div>
          )}
          <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0 prose dark:prose-invert">
            {children}
          </div>
        </div>
      </div>
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.border}, transparent)`
        }}
      />
    </div>
  );
}