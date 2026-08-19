import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { PageLoader } from '@/components/common/LoadingSpinner'
import { ROUTES } from '@/utils/constants'

// Lazy-loaded module pages
const PathwayPage   = lazy(() => import('@/modules/pathway/pages/PathwayPage').then(m => ({ default: m.PathwayPage })))
const BluebookPage  = lazy(() => import('@/modules/bluebook/pages/BluebookPage').then(m => ({ default: m.BluebookPage })))
const NetworkPage   = lazy(() => import('@/modules/network/pages/NetworkPage').then(m => ({ default: m.NetworkPage })))
const MyProfilePage = lazy(() => import('@/modules/myprofile/pages/MyProfilePage').then(m => ({ default: m.MyProfilePage })))
const SchedulePage  = lazy(() => import('@/modules/schedule/pages/SchedulePage').then(m => ({ default: m.SchedulePage })))
const SettingPage   = lazy(() => import('@/modules/setting/pages/SettingPage').then(m => ({ default: m.SettingPage })))

const LazyPage = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorBoundary><div /></ErrorBoundary>,
    children: [
      { index: true, element: <Navigate to={ROUTES.PATHWAY} replace /> },
      { path: ROUTES.PATHWAY,    element: <LazyPage><PathwayPage /></LazyPage> },
      { path: ROUTES.BLUEBOOK,   element: <LazyPage><BluebookPage /></LazyPage> },
      { path: ROUTES.NETWORK,    element: <LazyPage><NetworkPage /></LazyPage> },
      { path: ROUTES.MY_PROFILE, element: <LazyPage><MyProfilePage /></LazyPage> },
      { path: ROUTES.SCHEDULE,   element: <LazyPage><SchedulePage /></LazyPage> },
      { path: ROUTES.SETTING,    element: <LazyPage><SettingPage /></LazyPage> },
    ],
  },
])
