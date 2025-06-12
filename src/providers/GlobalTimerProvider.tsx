import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TimerContext, type TimerContextValue } from '../contexts/TimerContext';

export const GlobalTimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isRunning, setIsRunning] = useState(true);
  const subscribersRef = useRef(new Set<(time: number) => void>());
  const startTimeRef = useRef(Date.now());
  const pausedTimeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number>(0);

  // Subscribe function for components
  const subscribe = useCallback((callback: (time: number) => void) => {
    subscribersRef.current.add(callback);

    return () => {
      subscribersRef.current.delete(callback);
    };
  }, []);

  // Animation frame loop
  const tick = useCallback(() => {
    if (!isRunning) return;

    const now = Date.now();
    const elapsed =
      (now - startTimeRef.current - pausedTimeRef.current) * 0.001; // Convert to seconds

    // Only update if enough time has passed (throttle to ~60fps)
    if (now - lastTimeRef.current >= 16) {
      subscribersRef.current.forEach((callback) => callback(elapsed));
      lastTimeRef.current = now;
    }

    animationFrameRef.current = requestAnimationFrame(tick);
  }, [isRunning]);

  // Start the timer
  useEffect(() => {
    if (isRunning) {
      animationFrameRef.current = requestAnimationFrame(tick);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, tick]);

  // Pause/resume functionality
  const pause = useCallback(() => {
    if (isRunning) {
      pausedTimeRef.current += Date.now() - startTimeRef.current;
      setIsRunning(false);
    }
  }, [isRunning]);

  const resume = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = Date.now();
      setIsRunning(true);
    }
  }, [isRunning]);

  // Handle page visibility to avoid timer drift[2]
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pause();
      } else {
        resume();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [pause, resume]);

  const value: TimerContextValue = {
    time: 0, // This will be updated through subscriptions
    subscribe,
    isRunning,
    pause,
    resume,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
