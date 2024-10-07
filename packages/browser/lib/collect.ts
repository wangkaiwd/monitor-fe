import { getTarget, report } from './utils'

// auto invoke
export const reportPV = (params?: Record<string, any>) => {
  report({ eventType: 'pv', params })
}

export const reportExpose = (event: Event, params?: Record<string, any>) => {
  const target = getTarget(event)
  report({ eventType: 'expose', target, params })
}

export const reportClick = (event: Event, params?: Record<string, any>) => {
  const target = getTarget(event)
  report({ eventType: 'click', target, params })
}

export const reportCustomError = (info?: { message: string, params: Record<any, any> }) => {
  report({ eventType: 'error', params: info, errorType: 'custom' })
}

export const reportStayTime = () => {
  let enterTime: number | undefined = undefined
  window.addEventListener('load', () => {
    enterTime = Date.now()
  })
  window.addEventListener('beforeunload', () => {
    if (enterTime) {
      const stayTime = Date.now() - enterTime
      report({ stayTime, eventType: 'stay' })
    }
  })
}
