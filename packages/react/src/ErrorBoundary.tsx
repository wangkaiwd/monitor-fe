import React, { ErrorInfo } from 'react'
import { report } from '@monitor-fe/core/lib/utils.ts'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError () {
    return { hasError: true }
  }

  componentDidCatch (error: Error, info: ErrorInfo) {
    report({
      eventType: 'error',
      errorType: 'js',
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack,
    })
  }

  render () {
    console.log('render')
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default ErrorBoundary
