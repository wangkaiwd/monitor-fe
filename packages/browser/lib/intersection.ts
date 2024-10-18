import { getTarget, report } from './utils'
import { EventInfo } from './types'

export const createIntersection = (
  el: Element, params?: Record<string, any>, options?: IntersectionObserverInit) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        const target = getTarget(entry as any)
        const reportParams: Omit<EventInfo, 'triggerTime'> = { eventType: 'expose', target }
        if (params) {
          reportParams.params = params
        }
        report(reportParams)
      }
    })
  }, options)
  observer.observe(el)
  return observer
}
