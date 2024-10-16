import { DefaultMonitorOptions } from './types'
import { getFingerprint } from './utils'

export const defaultOptions: DefaultMonitorOptions = {
  dsn: 'http://localhost:3000/errors/upload',
  threshold: 10,
  delayTime: 3000,
  maxBreadcrumbsCount: 10,
  visitorId: String(getFingerprint()),
  collect: {
    click: true,
  },
}
