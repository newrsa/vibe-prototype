import { useEffect, useLayoutEffect } from 'react'
import { useAppStore } from '@/store'
import type { Theme } from '@/types'

const STORAGE_KEY = 'rsa-theme'

/**
 * Synchronizes the application store theme with document.documentElement's 'dark' class,
 * persists theme selection to localStorage under 'rsa-theme', and hydrates
 * the store from localStorage on initialization.
 */
export function useApplyTheme(): void {
  const theme = useAppStore((state) => state.theme)
  const setTheme = useAppStore((state) => state.setTheme)

  useLayoutEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if ((saved === 'light' || saved === 'dark') && saved !== useAppStore.getState().theme) {
      setTheme(saved as Theme)
    }
  }, [setTheme])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])
}
