// ============================================================
// Auth Types
// ============================================================

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: string
}

export type UserRole = 'admin' | 'user' | 'viewer'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
}
