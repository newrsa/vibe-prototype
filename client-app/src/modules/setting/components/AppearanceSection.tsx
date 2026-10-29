import { Moon, Sun } from 'lucide-react'
import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'

/**
 * Settings section for configuring application appearance and theme preferences.
 * Provides an accessible toggle switch to transition between light and dark themes.
 */
export function AppearanceSection() {
  const theme = useAppStore((state) => state.theme)
  const setTheme = useAppStore((state) => state.setTheme)
  const isDark = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <section className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          Customize how the application looks on your screen.
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-foreground">
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </div>
          <div>
            <div className="text-sm font-medium">Dark Mode</div>
            <div className="text-xs text-muted-foreground">
              {isDark ? 'Dark theme is currently active' : 'Light theme is currently active'}
            </div>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
          className={cn(
            'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            isDark ? 'bg-primary' : 'bg-input',
          )}
        >
          <span
            className={cn(
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out',
              isDark ? 'translate-x-5' : 'translate-x-0',
            )}
          />
        </button>
      </div>
    </section>
  )
}
