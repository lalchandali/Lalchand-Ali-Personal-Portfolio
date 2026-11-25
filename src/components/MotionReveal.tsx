import { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';

export const EXECUTIVE_EASE: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.08,
  margin: '0px 0px -48px 0px',
} as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EXECUTIVE_EASE,
    },
  },
};

export const staggerGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: EXECUTIVE_EASE,
    },
  },
};

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealBlock({
  children,
  className = '',
  delay = 0,
}: RevealBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{
        duration: 0.55,
        delay,
        ease: EXECUTIVE_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
