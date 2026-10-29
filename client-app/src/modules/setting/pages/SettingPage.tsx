import { AppearanceSection } from '../components/AppearanceSection'

/**
 * Settings page allowing users to configure application preferences
 * including appearance and themes.
 */
export function SettingPage() {
  return (
    <div className="container max-w-4xl p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your interface preferences and application settings.
        </p>
      </div>

      <AppearanceSection />
    </div>
  )
}
