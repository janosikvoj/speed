import { Toaster } from 'sonner';
import useScrollToast from './hooks/useScrollToasts';

const ToastsDisplay = () => {
  useScrollToast(200);

  return <Toaster expand position="top-right" dir="rtl" visibleToasts={8} />;
};

export default ToastsDisplay;
