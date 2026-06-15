import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { IS_EXPORT } from '../lib/deckMode';

type Dir = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** stagger delay index; multiplied by `step` seconds */
  i?: number;
  step?: number;
  delay?: number;
  from?: Dir;
  distance?: number;
  amount?: number;
  once?: boolean;
}

const offset = (dir: Dir, d: number) => {
  switch (dir) {
    case 'up':
      return { y: d };
    case 'down':
      return { y: -d };
    case 'left':
      return { x: d };
    case 'right':
      return { x: -d };
    default:
      return {};
  }
};

/**
 * Scroll-into-view reveal. Motion clarifies sequence only.
 * Respects prefers-reduced-motion by rendering content statically.
 */
export function Reveal({
  children,
  i = 0,
  step = 0.07,
  delay = 0,
  from = 'up',
  distance = 18,
  amount = 0.25,
  once = true,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const stat = reduce || IS_EXPORT; // render final state, no animation
  return (
    <motion.div
      initial={stat ? false : { opacity: 0, ...offset(from, distance) }}
      whileInView={stat ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.55, delay: delay + i * step, ease: [0.22, 0.61, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
