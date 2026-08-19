// ============================================================
// Formatters — Date, number, string utility functions
// ============================================================
import { format, formatDistanceToNow, parseISO } from 'date-fns'

/** Format an ISO date string to a human-readable format */
export function formatDate(date: string | Date, pattern = 'MMM dd, yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, pattern)
}

/** Format date to relative time (e.g. "3 hours ago") */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}

/** Format a number with thousand separators */
export function formatNumber(num: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale).format(num)
}

/** Format bytes to human readable size */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/** Truncate a string with ellipsis */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}…`
}

/** Capitalize the first letter of a string */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/** Convert snake_case or kebab-case to Title Case */
export function toTitleCase(str: string): string {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\w\S*/g, (word) => capitalize(word))
}

/** Get initials from a full name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
