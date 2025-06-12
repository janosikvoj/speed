import { useRef } from 'react';
import { toastTrigger } from '../toastTrigger';
import { randomToastTheme } from '../toastTheme';
import { useMotionValueEvent, useScroll } from 'motion/react';

const useScrollToast = (scrollThreshold: number = 200) => {
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (Math.abs(latest - lastScrollY.current) >= scrollThreshold) {
      toastTrigger({ theme: randomToastTheme() });
      lastScrollY.current = latest;
    }
  });
};

export default useScrollToast;
