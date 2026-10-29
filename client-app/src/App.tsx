import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { useApplyTheme } from '@/hooks/useApplyTheme'

/**
 * Root application component.
 * Mounts the theme synchronization hook and provides the application router.
 */
function App() {
  useApplyTheme()

  return <RouterProvider router={router} />
}

export default App
