import React, { useEffect, useRef } from 'react'
import { createIntersection } from '@monitor-fe/core'

interface IntersectionContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  exposeParams?: Record<string, any>
}

const IntersectionContainer = (props: IntersectionContainerProps) => {
  const { children, exposeParams, ...rest } = props
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!containerRef.current) { return }
    const observer = createIntersection(containerRef.current, exposeParams)
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])
  return (
    <div ref={containerRef} {...rest}>
      {children}
    </div>
  )
}

export default IntersectionContainer
