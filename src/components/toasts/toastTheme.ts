import { random } from 'lodash';
import type { ToastColors } from './types';

const toastThemes: ToastColors[] = [
  { bg: 'bg-carbon-2', title: 'bg-carbon-4', body: 'bg-carbon-3' },
  { bg: 'bg-oxygen-2', title: 'bg-carbon-4', body: 'bg-nitrogen-2' },
  { bg: 'bg-nitrogen-2', title: 'bg-carbon-1', body: 'bg-carbon-2' },
  { bg: 'bg-carbon-4', title: 'bg-oxygen-2', body: 'bg-oxygen-1' },
];

export function randomToastTheme() {
  return toastThemes[random(toastThemes.length - 1)];
}

export default toastThemes;
