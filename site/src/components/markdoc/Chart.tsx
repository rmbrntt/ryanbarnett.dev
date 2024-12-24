import React from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Dataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
}

interface ChartProps {
  type: 'line' | 'bar';
  labels: string[];
  datasets: Dataset[];
  title?: string;
  aspectRatio?: number;
  animate?: boolean;
  grid?: boolean;
}

const defaultColors = [
  'rgb(59, 130, 246)', // blue-500
  'rgb(16, 185, 129)', // green-500
  'rgb(239, 68, 68)',  // red-500
  'rgb(217, 119, 6)',  // yellow-600
  'rgb(147, 51, 234)', // purple-600
];

export function Chart({
  type = 'line',
  labels,
  datasets,
  title,
  aspectRatio = 2,
  animate = true,
  grid = true,
}: ChartProps) {
  // Enhance datasets with default colors if not provided
  const enhancedDatasets = datasets.map((dataset, index) => ({
    ...dataset,
    borderColor: dataset.borderColor || defaultColors[index % defaultColors.length],
    backgroundColor: dataset.backgroundColor || `${defaultColors[index % defaultColors.length]}33`,
    tension: 0.4,
    fill: type === 'line' ? 'origin' : undefined,
  }));

  const data: ChartData<'line' | 'bar'> = {
    labels,
    datasets: enhancedDatasets,
  };

  const options: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    aspectRatio,
    animation: {
      duration: animate ? 750 : 0,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: title
        ? {
            display: true,
            text: title,
            padding: {
              top: 10,
              bottom: 30,
            },
          }
        : undefined,
    },
    scales: {
      x: {
        grid: {
          display: grid,
          color: 'rgba(156, 163, 175, 0.1)', // gray-400 with low opacity
        },
        ticks: {
          color: 'rgb(156, 163, 175)', // gray-400
        },
      },
      y: {
        grid: {
          display: grid,
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        beginAtZero: true,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const ChartComponent = type === 'line' ? Line : Bar;

  return (
    <div className="relative w-full rounded-lg bg-white p-4 dark:bg-gray-800">
      <ChartComponent data={data} options={options} />
    </div>
  );
} 