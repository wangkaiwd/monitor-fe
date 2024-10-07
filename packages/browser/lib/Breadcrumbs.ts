import { baseOptions } from './Options'
import { EventInfo } from './types'

/**
 * 记录用户发生错误时的行为，方便根据用户的行为来排查错误：
 *  1. 入队的时间，及为事件发生时间
 *  2. 达到队列的最大长度后，最新发生的事件入队，最老发生的事件出队
 */
class Breadcrumbs {
  maxBreadcrumbsCount: number
  queue: EventInfo[] = []

  constructor (maxBreadcrumbsCount: number) {
    this.maxBreadcrumbsCount = maxBreadcrumbsCount
  }

  enqueue (breadcrumb: Omit<EventInfo, 'triggerTime'>) {
    this.queue.push({
      ...breadcrumb as any,
      triggerTime: Date.now(),
    })
    if (this.queue.length > this.maxBreadcrumbsCount) {
      this.dequeue()
    }
  }

  dequeue () {
    this.queue.shift()
  }
}

export let breadcrumbs: Breadcrumbs

export const createBreadcrumbs = () => {
  const { maxBreadcrumbsCount } = baseOptions.options
  breadcrumbs = new Breadcrumbs(maxBreadcrumbsCount)
}
