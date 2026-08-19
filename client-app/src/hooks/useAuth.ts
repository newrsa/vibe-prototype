import { useAuthStore } from '@/store/auth.store'

/**
 * Convenience hook that exposes auth state and actions.
 * Wraps the Zustand auth store for component usage.
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoading = useAuthStore((s) => s.isLoading)
  const login = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)
  const setUser = useAuthStore((s) => s.setUser)

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setUser,
  }
}
