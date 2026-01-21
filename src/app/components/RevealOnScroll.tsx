import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface RevealOnScrollProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  className?: string;
}

export function RevealOnScroll({ 
  children, 
  direction = 'up', 
  delay = 0,
  duration = 0.8,
  className = '' 
}: RevealOnScrollProps) {
  
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          initial: { opacity: 0, y: 60 },
          animate: { opacity: 1, y: 0 }
        };
      case 'down':
        return {
          initial: { opacity: 0, y: -60 },
          animate: { opacity: 1, y: 0 }
        };
      case 'left':
        return {
          initial: { opacity: 0, x: -60 },
          animate: { opacity: 1, x: 0 }
        };
      case 'right':
        return {
          initial: { opacity: 0, x: 60 },
          animate: { opacity: 1, x: 0 }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 }
        };
      case 'rotate':
        return {
          initial: { opacity: 0, rotate: -180, scale: 0 },
          animate: { opacity: 1, rotate: 0, scale: 1 }
        };
      default:
        return {
          initial: { opacity: 0, y: 60 },
          animate: { opacity: 1, y: 0 }
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      transition={{ 
        duration, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
