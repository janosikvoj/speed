import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface AdProps {
  className?: string;
  colors?: string[];
  speed?: number;
  delay?: number;
}

const Ad: React.FC<AdProps> = ({
  className,
  colors = ['bg-carbon-3', 'bg-nitrogen-3'],
  speed = 5,
  delay = 0,
}) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: 'easeInOut',
          delay,
        }}
        className="flex h-full w-[400%]"
      >
        {/* First set of colors */}
        <div className="flex h-full w-[200%]">
          {colors.map((color, index) => (
            <div key={index} className={cn('flex-1 h-full', color)} />
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex h-full w-[200%]">
          {colors.map((color, index) => (
            <div
              key={`duplicate-${index}`}
              className={cn('flex-1 h-full', color)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Ad;
