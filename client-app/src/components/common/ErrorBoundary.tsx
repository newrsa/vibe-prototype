import React from 'react'
import { useRouteError } from 'react-router-dom'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

// Standard React Error Boundary for component rendering errors
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-red-500 p-4">
          <h2 className="text-2xl font-bold mb-4">Something went wrong.</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-auto max-w-full text-sm">
            {this.state.error?.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

// Specific Error Boundary for React Router to display route/data errors
export function RouteErrorBoundary() {
  const error = useRouteError() as any

  console.error('Route error:', error)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-red-500 p-4">
      <h1 className="text-3xl font-bold mb-4">Application Error</h1>
      <p className="mb-4 text-gray-300">
        {error?.statusText || error?.message || "An unknown error occurred."}
      </p>
      {error?.data && (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-auto max-w-full text-sm">
          {typeof error.data === 'string' ? error.data : JSON.stringify(error.data, null, 2)}
        </pre>
      )}
      {error?.stack && (
        <pre className="bg-gray-900 text-gray-400 p-4 rounded mt-4 overflow-auto max-w-full text-xs">
          {error.stack}
        </pre>
      )}
    </div>
  )

}
