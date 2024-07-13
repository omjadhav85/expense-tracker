import { type ClassValue, clsx } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const showError = (err: any) => {
  toast.error(err.response.data.message || 'Something went wrong!');
};
