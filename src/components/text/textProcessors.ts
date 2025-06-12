// Splits text by spaces
export function splitText(text: string): string[] {
  return text.split(' ').map((word) => word);
}

// Glitch replaces text chars with random chars
const GLITCH_CHARS = [
  '█',
  '▓',
  '▒',
  '░',
  // '◢', '◣', '◤', '◥', '●', '○'
];

export function glitchChars(text: string, probability: number = 0.1): string {
  return text
    .split('')
    .map((char) => {
      if (char.trim() === '') {
        return char; // Don't replace whitespace characters
      }
      if (Math.random() < probability) {
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      return char;
    })
    .join('');
}

// Noise adds random chars to the text
const NOISE_CHARS = ['~', '|', '^', '*', '#', '@', '%', '$'];

export function noiseChars(text: string, probability: number = 0.05): string {
  return text
    .split('')
    .map((char) => {
      if (Math.random() < probability) {
        const noise =
          NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)];
        return char + noise;
      }
      return char;
    })
    .join('');
}

// Duplicates random chars (2-4x)
export function duplicateChars(
  text: string,
  probability: number = 0.1
): string {
  const minDup: number = 2;
  const maxDup: number = 4;
  return text
    .split('')
    .map((char) => {
      if (char.trim() === '') {
        return char; // Don't duplicate whitespace characters
      }
      if (Math.random() < probability) {
        const duplicates =
          Math.floor(Math.random() * (maxDup - minDup + 1)) + minDup;
        return char.repeat(duplicates);
      }
      return char;
    })
    .join('');
}
