import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Theme, Notification } from '@/types'

// ============================================================
// App Store — Global app-level state (sidebar, theme, notifications)
// ============================================================

interface AppStore {
  // Sidebar
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void

  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void

  // Notifications
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),

      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      // Notifications
      notifications: [],
      unreadCount: 0,

      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        })),

      clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
    }),
    { name: 'AppStore' },
  ),
)
