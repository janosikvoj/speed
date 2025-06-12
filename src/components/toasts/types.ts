export type ToastColors = {
  bg?: `bg-${string}`;
  title?: `bg-${string}`;
  body?: `bg-${string}`;
};

export interface ToastProps {
  theme?: ToastColors;
}
