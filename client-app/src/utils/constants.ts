// ============================================================
// Application Constants
// ============================================================

/** App meta */
export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'Client App'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.1.0'
export const APP_ENV = import.meta.env.VITE_APP_ENV ?? 'development'

/** API */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1'
export const API_TIMEOUT = 30_000 // 30s

/** Auth */
export const AUTH_TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'client_auth_token'
export const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY ?? 'client_refresh_token'

/** Route paths */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PATHWAY: '/pathway',
  BLUEBOOK: '/bluebook',
  NETWORK: '/network',
  MY_PROFILE: '/my-profile',
  SCHEDULE: '/schedule',
  SETTING: '/setting',
} as const

/** Modules config */
export const MODULES = [
  { key: 'pathway',   label: 'Pathway',    path: ROUTES.PATHWAY,    icon: 'Route' },
  { key: 'bluebook',  label: 'Bluebook',   path: ROUTES.BLUEBOOK,   icon: 'BookOpen' },
  { key: 'network',   label: 'Network',    path: ROUTES.NETWORK,    icon: 'Network' },
  { key: 'myprofile', label: 'My Profile', path: ROUTES.MY_PROFILE, icon: 'User' },
  { key: 'schedule',  label: 'Schedule',   path: ROUTES.SCHEDULE,   icon: 'CalendarDays' },
  { key: 'setting',   label: 'Settings',   path: ROUTES.SETTING,    icon: 'Settings' },
] as const

/** Pagination */
export const DEFAULT_PAGE_SIZE = 20

/** Query keys (for React Query caching) */
export const QUERY_KEYS = {
  AUTH: 'auth',
  PATHWAY: 'pathway',
  BLUEBOOK: 'bluebook',
  NETWORK: 'network',
  MY_PROFILE: 'my-profile',
  SCHEDULE: 'schedule',
  SETTING: 'setting',
  NOTIFICATIONS: 'notifications',
  AI: 'ai',
} as const
