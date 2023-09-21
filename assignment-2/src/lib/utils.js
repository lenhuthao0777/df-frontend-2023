import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const removeEmpty = (params) => {
  for (const key of Object.keys(params)) {
    if (params[key] === '' || params[key] === null || params[key] === undefined) {
      delete params[key]
    }
  }
  return params
}