import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { createNoise3D } from 'simplex-noise';
import alea from 'alea';
import { cn } from '../../lib/utils';

interface AnimatedWordProps {
  children?: React.ReactNode;
  className?: string;
  seed?: string; // Allow custom seeding for different effects
  animated?: boolean; // Toggle time-based animation
}

const colorGradient = [
  'nitrogen-3',
  'nitrogen-2',
  'nitrogen-1',
  'carbon-1',
  'oxygen-1',
  'oxygen-2',
  'oxygen-3',
];

const AnimatedWord: React.FC<AnimatedWordProps> = ({
  children,
  className,
  seed = 'default-seed',
  animated = true,
}) => {
  const wordRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  // Create seeded noise instance once
  const noise3D = useMemo(() => {
    const prng = alea(seed);
    return createNoise3D(prng);
  }, [seed]);

  // Update position from DOM element
  const updatePosition = useCallback(() => {
    if (wordRef.current) {
      const rect = wordRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
      });
    }
  }, []);

  // Set up position tracking
  useEffect(() => {
    updatePosition();

    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updatePosition]);

  // Animate time for dynamic colors
  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setTime(Date.now() * 0.0001);
    }, 50);

    return () => clearInterval(interval);
  }, [animated]);

  // Generate color based on position and time
  const wordColor = useMemo(() => {
    if (position.x === 0 && position.y === 0) return 'inherit';

    const scale = 0.002;
    const timeOffset = animated ? time : 0;

    const noise = noise3D(position.x * scale, position.y * scale, timeOffset);

    const normalizedNoise = (noise + 1) / 2;
    const colorIndex = Math.round(normalizedNoise * (colorGradient.length - 1));

    return `var(--color-${colorGradient[colorIndex]})`;
  }, [position.x, position.y, time, noise3D, animated]);

  useEffect(() => {
    if (wordRef.current) {
      wordRef.current.style.backgroundColor = wordColor;
    }
  }, [wordColor]);

  return (
    <span
      ref={wordRef}
      className={cn('inline-block px-2.5 transition-colors', className)}
    >
      {children}
    </span>
  );
};

export default AnimatedWord;
