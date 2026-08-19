// ============================================================
// Common Types — Shared across the entire application
// ============================================================

/** Generic API response wrapper */
export interface ApiResponse<T = unknown> {
  data: T
  message: string
  success: boolean
  statusCode: number
}

/** Generic paginated response */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/** Generic select option */
export interface SelectOption {
  label: string
  value: string | number
}

/** Base entity with timestamps */
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

/** App status */
export type AppStatus = 'idle' | 'loading' | 'success' | 'error'

/** Async state */
export interface AsyncState<T = unknown> {
  data: T | null
  status: AppStatus
  error: string | null
}

/** Navigation item */
export interface NavItem {
  label: string
  path: string
  icon?: string
  badge?: string | number
  children?: NavItem[]
}

/** Theme */
export type Theme = 'light' | 'dark' | 'system'

/** Notification */
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}
