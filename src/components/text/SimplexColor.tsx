import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { createNoise3D } from 'simplex-noise';
import alea from 'alea';
import { cn } from '../../lib/utils';
import { useGlobalTimer } from '../../hooks/useGlobalTimer';
import { random } from 'lodash';

interface SimplexColorProps {
  children?: React.ReactNode;
  className?: string;
  seed?: string;
  animated?: boolean;
  colors?: string[];
}

const randomRoundingClasses = ['rounded-full', 'rounded-none'];

const SimplexColor: React.FC<SimplexColorProps> = ({
  children,
  className,
  seed = 'default-seed',
  animated = true,
  colors = [
    'nitrogen-3',
    'nitrogen-2',
    'nitrogen-1',
    'carbon-1',
    'oxygen-1',
    'oxygen-2',
    'oxygen-3',
  ],
}) => {
  const wordRef = useRef<HTMLSpanElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const lastColorRef = useRef<string>('inherit');

  const { time } = useGlobalTimer(animated);

  // Create seeded noise instance once
  const noise3D = useMemo(() => {
    const prng = alea(seed);
    return createNoise3D(prng);
  }, [seed]);

  // Update position (throttled)
  const updatePosition = useCallback(() => {
    if (wordRef.current) {
      const rect = wordRef.current.getBoundingClientRect();
      positionRef.current = {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
      };
    }
  }, []);

  // Generate color and update DOM directly
  const updateColor = useCallback(() => {
    if (
      !wordRef.current ||
      (positionRef.current.x === 0 && positionRef.current.y === 0)
    ) {
      return;
    }

    const scale = 0.002;
    const timeOffset = animated ? time * 0.1 : 0; // Slow down time effect

    const noise = noise3D(
      positionRef.current.x * scale,
      positionRef.current.y * scale,
      timeOffset
    );

    const normalizedNoise = (noise + 1) / 2;
    const colorIndex = Math.round(normalizedNoise * (colors.length - 1));
    const color = `var(--color-${colors[colorIndex]})`;

    // Only update DOM if color actually changed
    if (color !== lastColorRef.current) {
      wordRef.current.style.backgroundColor = color;
      lastColorRef.current = color;
    }
  }, [noise3D, animated, time, colors]);

  // Setup position tracking
  useEffect(() => {
    updatePosition();

    let scrollTimeout: ReturnType<typeof setTimeout>;
    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        updatePosition();
        updateColor();
      }, 16);
    };

    const debouncedResize = () => {
      setTimeout(() => {
        updatePosition();
        updateColor();
      }, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(scrollTimeout);
    };
  }, [updatePosition, updateColor]);

  // Update color when time changes
  useEffect(() => {
    updateColor();
  }, [updateColor]);

  const randomRoundingClass = useMemo(
    () => randomRoundingClasses[random(randomRoundingClasses.length - 1)],
    []
  );

  return (
    <span
      ref={wordRef}
      className={cn(
        'inline-block transition-colors px-1 m-px',
        randomRoundingClass,
        className
      )}
    >
      {children}
    </span>
  );
};

export default SimplexColor;
