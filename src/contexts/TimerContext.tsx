import { createContext } from 'react';

export interface TimerContextValue {
  time: number;
  subscribe: (callback: (time: number) => void) => () => void;
  isRunning: boolean;
  pause: () => void;
  resume: () => void;
}

export const TimerContext = createContext<TimerContextValue | null>(null);
