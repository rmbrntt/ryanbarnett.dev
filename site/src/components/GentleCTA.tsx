import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuBloch } from './quantum/MenuBloch';

interface InteractiveMenuProps {
  children: React.ReactNode;
  menuContent: React.ReactNode;
  visualElement?: React.ReactNode;
  width?: string;
  position?: 'top' | 'bottom';
  offset?: number;
  bridgeHeight?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

export function InteractiveMenu({
  children,
  menuContent,
  visualElement,
  width = 'w-[300px] sm:w-[400px]',
  position = 'bottom',
  offset = 16,
  bridgeHeight = 16,
  onOpen,
  onClose
}: InteractiveMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleInteractionStart = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const handleInteractionEnd = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const handleTap = useCallback(() => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen, onOpen, onClose]);

  return (
    <motion.div
      className="relative inline-flex flex-col items-center"
      onHoverStart={handleInteractionStart}
      onHoverEnd={handleInteractionEnd}
      onTap={handleTap}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col items-center">
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute ${position === 'bottom' ? 'top-full mt-4' : 'bottom-full mb-4'} ${width} z-[100]`}
            initial={{ opacity: 0, y: position === 'bottom' ? 20 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'bottom' ? 20 : -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Hover bridge - only show on non-touch devices */}
            <div className="hidden md:block absolute ${position === 'bottom' ? '-top-4' : '-bottom-4'} left-0 w-full h-4" />
            
            <div className="relative bg-base-900/95 backdrop-blur-md rounded-lg border border-quantum-primary/10 shadow-xl">
              {visualElement && (
                <div className="relative -mt-24 flex items-center justify-center z-[101]">
                  <div className="absolute inset-0 bg-gradient-to-b from-quantum-primary/5 to-transparent rounded-full blur-3xl" />
                  <div className="relative -top-4">
                    {visualElement}
                  </div>
                </div>
              )}
              <div className="p-4">
                {menuContent}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface NavigationItemProps {
  href: string;
  children: React.ReactNode;
  onActiveChange?: (isActive: boolean) => void;
}

export function NavigationItem({ href, children, onActiveChange }: NavigationItemProps) {
  return (
    <motion.a
      href={href}
      className="block px-3 py-2 rounded-md text-sm text-quantum-primary/80 hover:text-quantum-primary hover:bg-quantum-primary/5 transition-colors relative group"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      onHoverStart={() => onActiveChange?.(true)}
      onHoverEnd={() => onActiveChange?.(false)}
      onTouchStart={() => onActiveChange?.(true)}
      onTouchEnd={() => onActiveChange?.(false)}
    >
      {children}
    </motion.a>
  );
}

interface GentleCTAProps {
  text: string;
  href?: string;
  withBloch?: boolean;
  variant?: 'vertical-line' | 'underline';
  className?: string;
  onClick?: () => void;
}

export function GentleCTA({ 
  text, 
  href, 
  withBloch = false, 
  variant = 'underline',
  className = '',
  onClick 
}: GentleCTAProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const content = (
    <>
      <span className="relative text-sm font-medium text-quantum-primary">
        {text}
      </span>

      {variant === 'vertical-line' && (
        <motion.div 
          className="absolute top-full w-px h-16 bg-gradient-to-b from-quantum-primary/60 to-transparent mt-2"
          animate={{ 
            scaleY: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />
      )}

      {variant === 'underline' && (
        <motion.span
          className="absolute -bottom-px left-0 right-0 h-px bg-quantum-primary/40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: activeItem ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      )}
    </>
  );

  const menuContent = (
    <div className="p-2 space-y-1">
      <NavigationItem 
        href="/lab/quantum-substrate"
        onActiveChange={(isActive) => setActiveItem(isActive ? 'substrate' : null)}
      >
        <span className="relative z-10">Substrate</span>
        {activeItem === 'substrate' && (
          <motion.div
            className="absolute inset-0 bg-quantum-primary/5 rounded-md"
            layoutId="activeBackground"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </NavigationItem>
      <NavigationItem 
        href="/lab/quantum-components"
        onActiveChange={(isActive) => setActiveItem(isActive ? 'components' : null)}
      >
        <span className="relative z-10">Components</span>
        {activeItem === 'components' && (
          <motion.div
            className="absolute inset-0 bg-quantum-primary/5 rounded-md"
            layoutId="activeBackground"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </NavigationItem>
      <NavigationItem 
        href="/lab/design-system"
        onActiveChange={(isActive) => setActiveItem(isActive ? 'design' : null)}
      >
        <span className="relative z-10">Design System</span>
        {activeItem === 'design' && (
          <motion.div
            className="absolute inset-0 bg-quantum-primary/5 rounded-md"
            layoutId="activeBackground"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </NavigationItem>
    </div>
  );

  const blochElement = withBloch ? (
    <div className="relative w-[200px] h-[200px]">
      <MenuBloch
        size={200}
        color="#88d0f3"
        wireframe={true}
        rotation={{ x: 0.001, y: 0.002, z: 0.001 }}
        onHover={() => setActiveItem('sphere')}
      />
    </div>
  ) : undefined;

  const wrappedContent = (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      {withBloch ? (
        <InteractiveMenu
          menuContent={menuContent}
          visualElement={blochElement}
        >
          {content}
        </InteractiveMenu>
      ) : (
        content
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {wrappedContent}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block">
      {wrappedContent}
    </button>
  );
} 