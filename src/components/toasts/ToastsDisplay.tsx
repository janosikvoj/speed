import { Toaster } from 'sonner';
import useScrollToast from './hooks/useScrollToasts';
import useScreenSize from '../../hooks/useScreenSize';

const ToastsDisplay = () => {
  useScrollToast(200);
  const { width } = useScreenSize();

  return (
    <Toaster expand position="top-right" visibleToasts={width > 600 ? 8 : 2} />
  );
};

export default ToastsDisplay;
