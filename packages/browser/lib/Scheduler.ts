import { request } from './request'
import { listen, nextTick } from './utils'
import { EventInfo, TimerId } from './types'
import { defaultOptions } from './defaultOptions'
import { baseOptions } from './Options'

/**
 *  事件上报调度：
 *  1. 批量上报
 *    1.1 达到最大数量阈值 threshold 时进行上报
 *    1.2 如果一值没达到最大阈值，在最后一次事件触发后延迟 delayTime 进行上报
 *  2. 分批进行上报，每次上报 threshold 个事件
 *  3. 上报后如果还有事件未上报，在浏览器空闲时间继续重复上报逻辑
 *
 */

export class Scheduler {
  tasks: EventInfo[] = []
  threshold: number
  delayTime: number
  timerId?: TimerId | null
  pending: boolean = false

  constructor (threshold?: number, delayTime?: number) {
    this.threshold = threshold ?? defaultOptions.threshold
    this.delayTime = delayTime ?? defaultOptions.delayTime
    this.beforeUnload()
  }

  addTask = (task: Omit<EventInfo, 'triggerTime'> | Omit<EventInfo, 'triggerTime'>[], flush: boolean = false) => {
    if (this.timerId) {
      clearTimeout(this.timerId)
      this.timerId = null
    }
    if (!Array.isArray(task)) {
      task = [task]
    }
    const tasksWithTime = task.map((item: Omit<EventInfo, 'triggerTime'>) => {
      return {
        ...item,
        triggerTime: Date.now(),
      }
    })
    this.tasks.push(...tasksWithTime)
    if (this.pending) { return }
    if (flush || this.tasks.length >= this.threshold) {
      this.runTasks()
    } else {
      this.timerId = setTimeout(() => {
        this.runTasks()
        this.timerId = null
      }, this.delayTime)
    }
  }

  runTasks = () => {
    if (!this.tasks.length) {
      return
    }
    this.pending = true
    const events = this.tasks.slice(0, this.threshold)
    this.tasks = this.tasks.slice(this.threshold)
    request(events)
    if (this.tasks.length) {
      nextTick(this.runTasks)
    } else {
      this.pending = false
    }
  }

  beforeUnload = () => {
    listen(window, 'beforeunload', () => {
      this.addTask([], true)
    })
  }
}

export let scheduler: Scheduler

export const createScheduler = () => {
  const { threshold, delayTime } = baseOptions.options
  scheduler = new Scheduler(threshold, delayTime)
}
