import { toast as sonnerToast } from 'sonner';
import type { ToastProps } from './types';
import Toast from './Toast';

export function toastTrigger({ theme }: ToastProps) {
  return sonnerToast.custom(() => <Toast theme={theme} />);
}
