import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { AuthState, AuthTokens, LoginPayload, User } from '@/types'
import { authService } from '@/services/auth.service'

// ============================================================
// Auth Store — Zustand global auth state
// ============================================================

interface AuthStore extends AuthState {
  login: (payload: LoginPayload) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User) => void
  setTokens: (tokens: AuthTokens) => void
  reset: () => void
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        login: async (payload: LoginPayload) => {
          set({ isLoading: true })
          try {
            const { user, tokens } = await authService.login(payload)
            set({ user, tokens, isAuthenticated: true, isLoading: false })
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },

        logout: async () => {
          await authService.logout()
          set(initialState)
        },

        setUser: (user: User) => set({ user }),
        setTokens: (tokens: AuthTokens) => set({ tokens }),
        reset: () => set(initialState),
      }),
      {
        name: 'client-auth',
        partialize: (state) => ({
          user: state.user,
          tokens: state.tokens,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    { name: 'AuthStore' },
  ),
)
