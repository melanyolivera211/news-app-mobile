export interface Toast {
  message: string;
  typo: 'error' | 'info' | 'confirmation';
  duration?: number;
}
