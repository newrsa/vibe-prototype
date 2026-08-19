import axiosInstance from './api/axiosInstance'
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/constants'
import type { ApiResponse, AuthTokens, LoginPayload, RegisterPayload, User } from '@/types'

// ============================================================
// Auth Service — Handles all authentication API calls
// ============================================================

export const authService = {
  /** Login with email and password */
  async login(payload: LoginPayload): Promise<{ user: User; tokens: AuthTokens }> {
    const res = await axiosInstance.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      '/auth/login',
      payload,
    )
    const { user, tokens } = res.data.data
    localStorage.setItem(AUTH_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
    return { user, tokens }
  },

  /** Register new user */
  async register(payload: RegisterPayload): Promise<{ user: User; tokens: AuthTokens }> {
    const res = await axiosInstance.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      '/auth/register',
      payload,
    )
    const { user, tokens } = res.data.data
    localStorage.setItem(AUTH_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
    return { user, tokens }
  },

  /** Get current user profile */
  async getMe(): Promise<User> {
    const res = await axiosInstance.get<ApiResponse<User>>('/auth/me')
    return res.data.data
  },

  /** Logout — clear tokens */
  async logout(): Promise<void> {
    try {
      await axiosInstance.post('/auth/logout')
    } finally {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
  },
}
