import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and merges Tailwind classes with tailwind-merge.
 * This is the standard ShadCN utility function.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
