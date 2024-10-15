import { AnyFn, EventInfo } from './types'
import { scheduler } from './Scheduler'
import { breadcrumbs } from './Breadcrumbs'

export const getTarget = (ev: Event) => {
  const target = ev.target as HTMLElement
  return [target.tagName, target.className].filter(Boolean).join(' ')
}

// https://stackoverflow.com/a/2117523/11720536
export const uuid = () => {
  return '10000000-1000-4000-8000-100000000000'.replace(
    /[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c /
        4).toString(
        16),
  )
}

/**
 * Rewrite name property which from source
 * @param source
 * @param name
 * @param replacer
 */
export const replaceAop = (source: Record<string, any>, name: string, replacer: Function) => {
  const origin = source[name]
  return source[name] = replacer(origin)
}

export const listen = (
  target: HTMLElement | Window | Document, eventName: string, listener: AnyFn,
  options?: boolean | AddEventListenerOptions) => {
  return target.addEventListener(eventName, listener, options)
}

export const nextTick = (cb: AnyFn) => {
  if (requestIdleCallback) {
    requestIdleCallback(cb, { timeout: 5000 })
  } else if (requestAnimationFrame) {
    requestAnimationFrame(cb)
  } else {
    // Execute at end time of one frame render
    setTimeout(cb, 17)
  }
}

export const map = (
  obj: Record<string, any>, iteratee: (key: string, val: string, obj: Record<string, any>) => any) => {
  const result: any[] = []
  Object.keys(obj).forEach((key) => {
    const val = obj[key]
    const returnValue = iteratee(key, val, obj)
    result.push(returnValue)
  })
  return result
}

export const report = (task: Omit<EventInfo, 'triggerTime'>) => {
  breadcrumbs.enqueue(task)
  if (task.eventType === 'error') {
    scheduler.addTask({
      ...task,
      breadcrumbs: breadcrumbs.queue,
    })
  } else {
    scheduler.addTask(task)
  }
}

// group error by errorType and message
export const groupError = (arr: EventInfo[]) => {
  const result: Record<string, EventInfo[]> = {}
  arr.forEach((item) => {
    const { errorType, message } = item
    const key = `${errorType}:${message}`
    const list = result[key] = result[key] || []
    list.push(item)
  })
  return Object.values(result)
}

export const isAbsoluteUrl = (url: string) => {
  const reg = /^(?:http:|https:|\/).*/
  return reg.test(url)
}

export const getLocationHref = () => {
  return window.location.href
}
