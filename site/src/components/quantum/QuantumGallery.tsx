import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { QuantumTheme } from '../markdoc/QuantumContainer';

export interface QuantumGalleryItem {
  id: string;
  title: string;
  image: string;
  description: string;
  theme: QuantumTheme;
}

export interface QuantumGalleryProps {
  items: QuantumGalleryItem[];
  columns?: 2 | 3 | 4;
  aspectRatio?: 'square' | 'video' | 'wide';
  className?: string;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[2/1]'
} as const;

const columnClasses = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
} as const;

export function QuantumGallery({ 
  items, 
  columns = 3, 
  aspectRatio = 'square',
  className 
}: QuantumGalleryProps) {
  return (
    <div 
      className={cn('grid gap-4', columnClasses[columns], className)}
      role="region"
      aria-label="Quantum Gallery"
    >
      {items.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative"
        >
          <div
            className={cn(
              'overflow-hidden rounded-lg border',
              aspectRatioClasses[aspectRatio]
            )}
            style={{ borderColor: item.theme.border }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br opacity-10 transition-opacity group-hover:opacity-20"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${item.theme.accent}, ${item.theme.background})`
              }}
              aria-hidden="true"
            />
            
            <img
              src={item.image}
              alt={`${item.title} - ${item.description}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div 
              className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              role="region"
              aria-label={`Details for ${item.title}`}
            >
              <h3
                className="text-lg font-medium mb-1"
                style={{ color: item.theme.foreground }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm"
                style={{ color: item.theme.muted }}
              >
                {item.description}
              </p>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
} 