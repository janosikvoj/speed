import React from 'react';

interface WordProps {
  children: React.ReactNode;
}

const Word: React.FC<WordProps> = ({ children }) => {
  return (
    <span className="inline-block px-2.5 border border-silicon-3">
      {children}
    </span>
  );
};

export default Word;
