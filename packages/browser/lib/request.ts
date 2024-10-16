import { BaseInfo, EventInfo, ReportOptions, ReportParams } from './types'
import { baseOptions } from './Options'

const createCommonParams = (): BaseInfo => {
  const ua = navigator.userAgent
  const url = location.href
  const timestamp = Date.now()
  return {
    ua,
    url,
    sendTime: timestamp,
    appId: baseOptions.options.appId,
    userId: baseOptions.options.userId,
    visitorId: baseOptions.options.visitorId
  }
}

/**
 * Upload log info to server api
 * @param events request params
 * @param options request options
 */

export const request = (events: EventInfo[], options: ReportOptions = { type: 'beacon' }) => {
  const commonParams = createCommonParams()
  const mergedParams: ReportParams = {
    events,
    ...commonParams,
  }
  const json = JSON.stringify(mergedParams)
  if (options.type === 'beacon') {
    navigator.sendBeacon(baseOptions.options.dsn, json)
  }
}
