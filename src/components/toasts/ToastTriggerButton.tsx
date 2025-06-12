import { random } from 'lodash';
import toastThemes from './toastTheme';
import { toastTrigger } from './toastTrigger';

export default function ToastTriggerButton() {
  return (
    <button
      className="relative h-8 px-1.5 text-sm font-medium text-carbon-1 bg-nitrogen-3 hover:bg-nitrogen-2 cursor-pointer"
      onClick={() => {
        toastTrigger({ theme: toastThemes[random(toastThemes.length - 1)] });
      }}
    >
      Render toast
    </button>
  );
}
