/**
 * Unit 001 - Appearance theme: ACCEPTANCE TESTS
 * Written from specs/unit-001-appearance-theme.md, BEFORE implementation (the oracle).
 * Expected to FAIL until Unit 001 is built, then PASS. Maps 1:1 to AC1-AC6.
 *
 * Contract the implementation MUST provide:
 *   hook  : src/hooks/useApplyTheme.ts            -> export function useApplyTheme(): void
 *   comp  : src/modules/setting/components/AppearanceSection.tsx
 *           re-exported from the setting module index -> export function AppearanceSection()
 *   store : useAppStore already has { theme, setTheme }   (existing)
 *   persist: theme saved in localStorage under key 'rsa-theme'; hydrated on hook init
 *   control: a toggle with role="switch"; aria-checked === (theme === 'dark')
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { useAppStore } from '@store'
import { useApplyTheme } from '@hooks/useApplyTheme'
import { AppearanceSection } from '@modules/setting'

beforeEach(() => {
  document.documentElement.classList.remove('dark')
  localStorage.clear()
  act(() => useAppStore.setState({ theme: 'dark' }))
})

describe('Unit 001 - Appearance theme', () => {
  it('AC1+AC2: renders an Appearance section whose control reflects the current theme', () => {
    act(() => useAppStore.setState({ theme: 'light' }))
    render(<AppearanceSection />)
    expect(screen.getByText(/appearance/i)).toBeInTheDocument()
    const control = screen.getByRole('switch')
    expect(control).toBeInTheDocument()
    expect(control).toHaveAttribute('aria-checked', 'false') // light
  })

  it('AC3: activating the control updates the store theme', () => {
    act(() => useAppStore.setState({ theme: 'light' }))
    render(<AppearanceSection />)
    fireEvent.click(screen.getByRole('switch'))
    expect(useAppStore.getState().theme).toBe('dark')
    fireEvent.click(screen.getByRole('switch'))
    expect(useAppStore.getState().theme).toBe('light')
  })

  it('AC4: toggles the dark class on <html> to match the theme', () => {
    renderHook(() => useApplyTheme())
    act(() => useAppStore.setState({ theme: 'dark' }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    act(() => useAppStore.setState({ theme: 'light' }))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('AC5: persists the theme and restores it on re-init (reload)', () => {
    renderHook(() => useApplyTheme())
    act(() => useAppStore.setState({ theme: 'light' }))
    expect(localStorage.getItem('rsa-theme')).toBe('light')
    // simulate reload: storage says dark, store stale light, re-init should hydrate to dark
    localStorage.setItem('rsa-theme', 'dark')
    act(() => useAppStore.setState({ theme: 'light' }))
    renderHook(() => useApplyTheme())
    expect(useAppStore.getState().theme).toBe('dark')
  })

  it('AC6: new source contains no hardcoded hex colors', () => {
    const files = [
      'src/modules/setting/components/AppearanceSection.tsx',
      'src/hooks/useApplyTheme.ts',
    ]
    const hex = /#[0-9a-fA-F]{3,8}\b/
    for (const f of files) {
      const src = readFileSync(resolve(process.cwd(), f), 'utf8')
      expect(hex.test(src), f + ' must not contain hardcoded hex colors').toBe(false)
    }
  })
})
