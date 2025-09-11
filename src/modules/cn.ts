import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** https://akhilaariyachandra.com/blog/using-clsx-or-classnames-with-tailwind-merge */
export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args))
}
