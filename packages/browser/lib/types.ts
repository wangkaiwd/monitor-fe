export type ErrorType = 'xhr' | 'fetch' | 'js' | 'promise' | 'resource' | 'custom'

export interface CollectProps {
  click: boolean
}

export interface DefaultMonitorOptions {
  dsn: string
  collect: CollectProps
  threshold: number
  delayTime: number
  maxBreadcrumbsCount: number
  visitorId: string
}

export interface MonitorOptions extends Partial<DefaultMonitorOptions> {
  appId: string
  userId: string
}

export type AnyFn = (...args: any[]) => any

export type TimerId = ReturnType<typeof setTimeout>

export type EventType =
  'pv'
  | 'click'
  | 'expose'
  | 'custom'
  | 'perf'
  | 'stay'
  | 'error'

export interface BaseInfo {
  ua: string
  url: string
  sendTime: number
  appId: string
  visitorId: string
  userId: string
}

export interface EventInfo {
  [key: string]: any

  params?: Record<string, any>
  triggerTime: number
  eventType: EventType
  errorType?: ErrorType
  lineno?: number
  colno?: number
  filename?: string
  stack?: string
  componentStack?: string // React component error stack
  message?: string
  batchErrorLength?: number
  batchErrorLastHappenTime?: number
  breadcrumbs?: EventInfo[]
}

export interface ReportParams extends BaseInfo {
  events: EventInfo[]
}

export interface ReportOptions {
  type: 'xhr' | 'img' | 'beacon'
}
