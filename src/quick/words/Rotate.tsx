import React from 'react';
import { motion } from 'motion/react';
import Word from './Word';

interface RotateProps {
  children: React.ReactNode;
}

const Rotate: React.FC<RotateProps> = ({ children }) => {
  return (
    <Word>
      <motion.span
        animate={{ rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.5 }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </Word>
  );
};

export default Rotate;
