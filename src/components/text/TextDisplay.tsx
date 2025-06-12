import { useMemo } from 'react';
import paragraphs from './data/paragraphs';
import { duplicateChars, glitchChars, noiseChars } from './textProcessors';
import Paragraph from './Paragraph';

const TextDisplay = () => {
  const processedParagraphs = useMemo(() => {
    const effects: Array<(text: string) => string> = [];

    effects.push((text: string) => glitchChars(text, 0.1));

    effects.push((text: string) => noiseChars(text, 0.1));

    effects.push((text: string) => duplicateChars(text, 0.1));

    return paragraphs.map((paragraph) =>
      effects.reduce((text, effect) => effect(text), paragraph)
    );
  }, []);

  return (
    <>
      <h1 className="text-6xl md:text-8xl font-neon font-bold mb-8">
        The meaning of life is:
      </h1>
      {processedParagraphs.map((paragraph) => (
        <Paragraph>{paragraph}</Paragraph>
      ))}
    </>
  );
};

export default TextDisplay;
