import React, { useMemo } from 'react';
import { useSimplexColor } from './hooks/useSimplexColor';
import { random } from 'lodash';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const roundingClasses = ['rounded-full', 'rounded-none'];
const colorPalettes = [
  undefined,
  [
    { bg: 'carbon-1', text: 'oxygen-1' },
    { bg: 'silicon-1', text: 'oxygen-2' },
    { bg: 'silicon-2', text: 'oxygen-3' },
    { bg: 'silicon-3', text: 'oxygen-1' },
  ],
];
const textTransitions = [
  // Horizontal slide
  {
    animate: { x: ['-100%', '100%'] },
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: [0.1, 0.5, 0.9, 0.5],
    },
  },
  // Vertical slide
  {
    animate: { y: ['-100%', '100%'] },
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: [0.1, 0.5, 0.9, 0.5],
    },
  },
  // 3D rotate
  {
    animate: { rotateY: 360 },
    transition: { repeat: Infinity, duration: 5, repeatDelay: 0.5 },
  },
  // No transition
  {},
];

interface WordProps {
  className?: string;
  children: React.ReactNode;
}

const Word: React.FC<WordProps> = ({ children, className }) => {
  const randomRoundingClass = useMemo(
    () => roundingClasses[random(roundingClasses.length - 1)],
    []
  );

  const randomColorPalette = useMemo(
    () => colorPalettes[random(colorPalettes.length - 1)],
    []
  );

  const randomTextTransition = useMemo(
    () => textTransitions[random(textTransitions.length - 1)],
    []
  );

  const { ref } = useSimplexColor({ colors: randomColorPalette });

  return (
    <span
      ref={ref}
      className={cn(
        'inline-block transition-colors m-px overflow-hidden',
        randomRoundingClass,
        className
      )}
    >
      <motion.span {...randomTextTransition} className="inline-block px-1">
        {children}
      </motion.span>
    </span>
  );
};

export default Word;
