import React from 'react';
import { motion } from 'motion/react';

const AnimatedTextRenderer: React.FC<{ content: string }> = ({ content }) => {
  const parseContent = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line, index) => {
      // Detect different types of content
      if (line.match(/^[.":!~|~!:."]+$/)) {
        // ASCII art or symbols
        return (
          <motion.div
            key={index}
            className="font-radon text-center my-6 text-carbon-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {line}
          </motion.div>
        );
      }

      if (line.match(/^(Hush|Fuzz|Plop|Drift)/i)) {
        // Sound words
        return (
          <motion.p
            key={index}
            className="font-neon text-nitrogen-1 text-lg my-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            {highlightSpecialWords(line)}
          </motion.p>
        );
      }

      // Regular paragraphs
      return (
        <motion.p
          key={index}
          className="font-xenon text-carbon-4 mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
        >
          {highlightSpecialWords(line)}
        </motion.p>
      );
    });
  };

  const highlightSpecialWords = (text: string) => {
    return text.split(/(\s+)/).map((word, i) => {
      if (word.match(/^(plop|hush|pling|fuzz|drift|ššš)$/i)) {
        return (
          <span key={i} className="text-nitrogen-2 font-argon italic">
            {word}
          </span>
        );
      }
      if (word.match(/^(liberté|frei|свобода|freedom)$/)) {
        return (
          <span key={i} className="text-oxygen-2 font-semibold">
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-carbon-1">
      {parseContent(content)}
    </div>
  );
};

export default AnimatedTextRenderer;
