import { toast as sonnerToast } from 'sonner';
import { cn, generateRandomString } from '../lib/utils';
import _ from 'lodash';

function toast({ theme }: ToastProps) {
  return sonnerToast.custom(() => <Toast theme={theme} />);
}

const toastThemes: ToastColors[] = [
  { bg: 'bg-carbon-2', title: 'bg-carbon-4', body: 'bg-carbon-3' },
  { bg: 'bg-oxygen-2', title: 'bg-carbon-4', body: 'bg-nitrogen-2' },
  { bg: 'bg-nitrogen-2', title: 'bg-carbon-1', body: 'bg-carbon-2' },
  { bg: 'bg-carbon-4', title: 'bg-oxygen-2', body: 'bg-oxygen-1' },
];

type ToastColors = {
  bg?: `bg-${string}`;
  title?: `bg-${string}`;
  body?: `bg-${string}`;
};

interface ToastProps {
  theme?: ToastColors;
}

const Toast: React.FC<ToastProps> = ({ theme }) => {
  return (
    <div
      className={cn(
        'flex bg-oxygen-2 w-full md:max-w-[364px] items-center p-2.5',
        theme?.bg
      )}
    >
      <div className="flex flex-1 items-center">
        <div className="w-full select-none">
          <p
            className={cn(
              'w-fit text-lg bg-carbon-4 font-medium text-transparent',
              theme?.title
            )}
          >
            {generateRandomString(15, 35)}
          </p>
          <p className="mt-2">
            <span
              className={cn(
                'text-sm bg-carbon-3 text-transparent',
                theme?.body
              )}
            >
              {generateRandomString(15, 40)}
            </span>
            <br />
            <span
              className={cn(
                'text-sm bg-carbon-3 text-transparent',
                theme?.body
              )}
            >
              {generateRandomString(5, 15)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Headless() {
  return (
    <button
      className="relative h-8 px-1.5 text-sm font-medium text-carbon-1 bg-nitrogen-3 hover:bg-nitrogen-2 cursor-pointer"
      onClick={() => {
        toast({ theme: toastThemes[_.random(toastThemes.length - 1)] });
      }}
    >
      Render toast
    </button>
  );
}
