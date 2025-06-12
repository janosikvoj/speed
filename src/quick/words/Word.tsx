import { random } from 'lodash';
import React from 'react';
import { cn } from '../../lib/utils';

interface WordProps {
  children: React.ReactNode;
}

const Word: React.FC<WordProps> = ({ children }) => {
  const randomRoundingClasses = ['rounded-full', 'rounded-sm', 'rounded-none'];
  return (
    <span
      className={cn(
        'inline-block px-2.5',
        randomRoundingClasses[random(randomRoundingClasses.length - 1)]
      )}
    >
      {children}
    </span>
  );
};

export default Word;
