import React from 'react';
import { motion } from 'motion/react';

interface RotateProps {
  children: React.ReactNode;
}

const Rotate: React.FC<RotateProps> = ({ children }) => {
  return (
    <motion.span
      animate={{ rotateY: 360 }}
      transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.5 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
};

export default Rotate;
