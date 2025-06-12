import { useEffect, useMemo, useRef, useCallback } from 'react';
import { createNoise3D } from 'simplex-noise';
import alea from 'alea';
import { useGlobalTimer } from '../../../hooks/useGlobalTimer';

interface UseSimplexColorOptions {
  seed?: string;
  colors?: {
    bg: string;
    text: string;
  }[];
  scale?: number;
  timeSpeed?: number;
}

export const useSimplexColor = ({
  seed = 'default-seed',
  colors = [
    { bg: 'nitrogen-3', text: 'carbon-1' },
    { bg: 'nitrogen-2', text: 'carbon-4' },
    { bg: 'nitrogen-1', text: 'carbon-4' },
    { bg: 'carbon-1', text: 'carbon-4' },
    { bg: 'oxygen-1', text: 'carbon-4' },
    { bg: 'oxygen-2', text: 'carbon-4' },
    { bg: 'oxygen-3', text: 'carbon-1' },
  ],
  scale = 0.002,
  timeSpeed = 0.1,
}: UseSimplexColorOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const lastBgColorRef = useRef<string>('inherit');
  const lastTextColorRef = useRef<string>('inherit');

  const { time } = useGlobalTimer();

  // Create seeded noise instance once
  const noise3D = useMemo(() => {
    const prng = alea(seed);
    return createNoise3D(prng);
  }, [seed]);

  // Update position
  const updatePosition = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      positionRef.current = {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
      };
    }
  }, []);

  // Generate color
  const getCurrentColor = useCallback(() => {
    if (positionRef.current.x === 0 && positionRef.current.y === 0) {
      return { bg: 'inherit', text: 'inherit' };
    }

    const timeOffset = time * timeSpeed;
    const noise = noise3D(
      positionRef.current.x * scale,
      positionRef.current.y * scale,
      timeOffset
    );

    const normalizedNoise = (noise + 1) / 2;
    const colorIndex = Math.round(normalizedNoise * (colors.length - 1));
    return {
      bg: `var(--color-${colors[colorIndex].bg})`,
      text: `var(--color-${colors[colorIndex].text})`,
    };
  }, [noise3D, time, colors, scale, timeSpeed]);

  // Update DOM color directly for performance
  const updateColor = useCallback(() => {
    if (!elementRef.current) return;

    const { bg, text } = getCurrentColor();

    if (bg !== lastBgColorRef.current) {
      elementRef.current.style.backgroundColor = bg;
      lastBgColorRef.current = bg;
    }

    if (text !== lastTextColorRef.current) {
      elementRef.current.style.color = text;
      lastTextColorRef.current = text;
    }
  }, [getCurrentColor]);

  // Setup event listeners
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

  return {
    ref: elementRef,
    currentColor: getCurrentColor(),
    updateColor,
    updatePosition,
  };
};
