import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyPress } from '../../hooks/useKeyPress';

interface Image {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface GalleryProps {
  images: Image[];
  columns?: number;
  gap?: number;
  aspectRatio?: string;
}

export function Gallery({ 
  images, 
  columns = 3, 
  gap = 4,
  aspectRatio = '4/3'
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  useKeyPress('Escape', () => setSelectedImage(null));
  useKeyPress('ArrowRight', () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  });
  useKeyPress('ArrowLeft', () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  });

  return (
    <>
      <div 
        className={`grid gap-${gap} grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns}`}
        style={{ 
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` 
        }}
      >
        {images.map((image, index) => (
          <motion.button
            key={image.src}
            onClick={() => setSelectedImage(index)}
            className="relative block w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            style={{ aspectRatio }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {image.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-sm text-white">{image.caption}</p>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute right-4 top-4 text-white hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {selectedImage > 0 && (
              <button
                className="absolute left-4 text-white hover:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage - 1);
                }}
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {selectedImage < images.length - 1 && (
              <button
                className="absolute right-4 text-white hover:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage + 1);
                }}
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="h-full w-full object-contain"
              />
              {images[selectedImage].caption && (
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4">
                  <p className="text-center text-white">{images[selectedImage].caption}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 