import React from 'react'

class ErrorBoundary extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error: any) {
    console.log('error', error)
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch (...args: any[]) {
    console.log('args', args)
  }

  render () {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default ErrorBoundary
