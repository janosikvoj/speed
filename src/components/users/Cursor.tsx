import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
} from 'motion/react';
import { cn, generateRandomString } from '../../lib/utils';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

interface CursorProps {
  constraints: React.RefObject<HTMLElement | null>;
  className?: string;
  displayName?: string;
  cycleDuration?: number;
  delay?: number;
  addComment?: (x: number, y: number) => void;
}

const Cursor: React.FC<CursorProps> = ({
  className,
  constraints,
  displayName = generateRandomString(5, 15),
  cycleDuration = 2000,
  delay = 0,
  addComment,
}) => {
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);

  const lastUpdateTime = useRef(0);
  const boundsCache = useRef({ width: 0, height: 0, lastUpdate: 0 });
  const animationRefs = useRef<Array<() => void>>([]);
  const hasStarted = useRef(false);

  // Memoize displayName to prevent regeneration on every render
  const memoizedDisplayName = useMemo(
    () => displayName || generateRandomString(5, 15),
    [displayName]
  );

  // Cache bounds with invalidation
  const getConstraintBounds = useCallback(() => {
    if (!constraints.current) return { width: 0, height: 0 };

    const now = Date.now();
    // Cache bounds for 100ms to reduce expensive getBoundingClientRect calls
    if (now - boundsCache.current.lastUpdate > 100) {
      const rect = constraints.current.getBoundingClientRect();
      boundsCache.current = {
        width: rect.width - 20,
        height: rect.height - 20,
        lastUpdate: now,
      };
    }

    return {
      width: boundsCache.current.width,
      height: boundsCache.current.height,
    };
  }, [constraints]);

  // Cleanup function for ongoing animations
  const stopAllAnimations = useCallback(() => {
    animationRefs.current.forEach((stop) => stop());
    animationRefs.current = [];
  }, []);

  const moveToRandomPosition = useCallback(() => {
    const bounds = getConstraintBounds();
    if (bounds.width === 0 || bounds.height === 0) return;

    const newX = Math.random() * bounds.width;
    const newY = Math.random() * bounds.height;

    // Stop previous animations
    stopAllAnimations();

    // Start new animations and store their stop functions
    const controlsX = animate(posX, newX, {
      type: 'spring',
      bounce: 0.1,
      duration: (cycleDuration / 1000) * 0.75,
      onComplete: () => {
        if (addComment && Math.random() < 0.2 && newX / bounds.width < 0.8) {
          addComment(newX, newY);
        }
      },
    });

    const controlsY = animate(posY, newY, {
      type: 'spring',
      bounce: 0.1,
      duration: (cycleDuration / 1000) * 0.75,
    });

    animationRefs.current = [() => controlsX.stop(), () => controlsY.stop()];
  }, [
    posX,
    posY,
    getConstraintBounds,
    stopAllAnimations,
    cycleDuration,
    addComment,
  ]);

  // Set initial position on mount
  useEffect(() => {
    const bounds = getConstraintBounds();
    if (bounds.width > 0 && bounds.height > 0) {
      posX.set(Math.random() * bounds.width);
      posY.set(Math.random() * bounds.height);
    }
  }, [getConstraintBounds, posX, posY]);

  useAnimationFrame((time) => {
    if (!hasStarted.current) {
      if (time > delay) {
        hasStarted.current = true;
        lastUpdateTime.current = time;
      }
      return;
    }

    // Regular movement timing after delay has passed
    if (time - lastUpdateTime.current > cycleDuration) {
      moveToRandomPosition();
      lastUpdateTime.current = time;
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    hasStarted.current = false;
    return () => {
      stopAllAnimations();
    };
  }, [stopAllAnimations, delay]);

  return (
    <motion.div
      className={cn('absolute top-0 left-0 text-carbon-4', className)}
      style={{ x: posX, y: posY }}
      transition={{ duration: 1.5 }}
    >
      <p className="absolute top-5 left-5 text-transparent bg-carbon-3 text-nowrap">
        {memoizedDisplayName}
      </p>
      <svg className="size-5" viewBox="0 0 100 100">
        <path
          d="M100,42.857l-42.857,15.714l-14.286,41.429l-42.857,-100l100,42.857Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );
};

export default Cursor;
