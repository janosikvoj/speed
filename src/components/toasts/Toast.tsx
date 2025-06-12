import { memo } from 'react';
import { cn, generateRandomString } from '../../lib/utils';
import type { ToastProps } from './types';

const Toast: React.FC<ToastProps> = memo(({ theme }) => {
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
});

Toast.displayName = 'Toast';

export default Toast;
