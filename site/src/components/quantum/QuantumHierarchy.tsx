import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { type QuantumTheme, quantumThemes } from '../markdoc/QuantumContainer';

interface HierarchyLevel {
  title: string;
  theme?: QuantumTheme;
  content?: ReactNode;
  size?: 'sm' | 'base' | 'lg' | 'xl';
}

interface QuantumHierarchyProps {
  levels: HierarchyLevel[];
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
}

export function QuantumHierarchy({
  levels,
  className,
  spacing = 'normal'
}: QuantumHierarchyProps) {
  return (
    <div className={cn(
      'space-y-4',
      {
        'space-y-2': spacing === 'tight',
        'space-y-4': spacing === 'normal',
        'space-y-6': spacing === 'loose'
      },
      className
    )}>
      {levels.map((level, index) => {
        const theme = level.theme || quantumThemes.cyan;
        
        return (
          <div
            key={level.title}
            className={cn(
              'relative p-4 rounded-lg',
              'bg-white/5 dark:bg-gray-900/5',
              'border border-transparent',
              'backdrop-blur-sm transition-all duration-300',
              'hover:bg-white/10 dark:hover:bg-gray-900/10',
              'group'
            )}
            style={{
              borderColor: theme.colors.border
            }}
          >
            <div className={cn(
              'font-mono',
              {
                'text-sm': level.size === 'sm',
                'text-base': level.size === 'base',
                'text-lg': level.size === 'lg',
                'text-xl': level.size === 'xl'
              }
            )} style={{ color: theme.colors.text }}>
              {level.title}
            </div>
            {level.content && (
              <div className="mt-2 opacity-80" style={{ color: theme.colors.text }}>
                {level.content}
              </div>
            )}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-3xl"
              style={{
                background: `radial-gradient(circle at center, ${theme.colors.primary}22 0%, ${theme.colors.secondary}22 100%)`
              }}
            />
          </div>
        );
      })}
    </div>
  );
}