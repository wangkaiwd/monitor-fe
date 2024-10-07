// todo: remain to revoke performance observer
import { report } from './utils'

export const createPerformanceObserver = () => {
  // todo: throttle
  const observer = new PerformanceObserver((entries) => {
    let fp = 0
    let fcp = 0
    let lcp = 0
    const list = entries.getEntries()
    list.forEach((item) => {
      if (item.name === 'first-paint') {
        fp = item.startTime
      } else if (item.name === 'first-contentful-paint') {
        fcp = item.startTime
      } else if (item.entryType === 'largest-contentful-paint') {
        lcp = item.startTime
      }
    })
    if (fp && fcp && lcp) {
      report({ eventType: 'perf', triggerTime: Date.now() })
    }
  })
  observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] })
}
