import { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexts/TimerContext';

export const useGlobalTimer = () => {
  const context = useContext(TimerContext);
  const [time, setTime] = useState(0);

  if (!context) {
    throw new Error('useGlobalTimer must be used within GlobalTimerProvider');
  }

  useEffect(() => {
    const unsubscribe = context.subscribe((newTime) => {
      setTime(newTime);
    });

    return unsubscribe;
  }, [context]);

  return {
    time,
    isRunning: context.isRunning,
    pause: context.pause,
    resume: context.resume,
  };
};
