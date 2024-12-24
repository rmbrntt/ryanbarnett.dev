import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { QuantumTheme } from '../../lib/theme';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface QuantumChartProps {
  type: 'wave' | 'probability';
  title: string;
  data: ChartData<'line'>;
  theme: QuantumTheme;
  className?: string;
}

export function QuantumChart({ type, title, data, theme, className }: QuantumChartProps) {
  const options: ChartOptions<'line'> = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme.foreground,
          font: {
            family: 'var(--font-mono)',
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: title,
        color: theme.foreground,
        font: {
          family: 'var(--font-sans)',
          size: 16,
          weight: '500'
        }
      },
      tooltip: {
        backgroundColor: theme.background,
        titleColor: theme.foreground,
        bodyColor: theme.muted,
        borderColor: theme.border,
        borderWidth: 1,
        padding: 12,
        titleFont: {
          family: 'var(--font-mono)',
          size: 12
        },
        bodyFont: {
          family: 'var(--font-mono)',
          size: 12
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: theme.border,
          borderColor: theme.border,
        },
        ticks: {
          color: theme.muted,
          font: {
            family: 'var(--font-mono)',
            size: 10
          }
        }
      },
      y: {
        grid: {
          color: theme.border,
          borderColor: theme.border,
        },
        ticks: {
          color: theme.muted,
          font: {
            family: 'var(--font-mono)',
            size: 10
          }
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'rounded-lg border p-4',
        'bg-gradient-to-br from-background to-background/50',
        'backdrop-blur-sm',
        className
      )}
      style={{
        borderColor: theme.border,
        backgroundColor: theme.background
      }}
    >
      <Line options={options} data={data} />
    </motion.div>
  );
} 