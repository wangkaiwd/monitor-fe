import { getTarget, report } from './utils'

export const createIntersection = (
  el: HTMLElement, params: Record<string, any> = {}, options?: IntersectionObserverInit) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        const target = getTarget(entry.target as any)
        report({ eventType: 'expose', params, target })
      }
    })
  }, options)
  observer.observe(el)
  return observer
}
