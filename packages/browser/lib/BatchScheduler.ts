import { EventInfo, TimerId } from './types'
import { scheduler } from './Scheduler'
import { groupError } from './utils'

// todo: 感觉代码比较复杂，能否进行优化？

// 这块代码是核心功能，并且逻辑复杂，一定要写测试用例
//  1. 方便重构和优化逻辑
//  2. 方便功能迭代
//  3. 保证SDK的稳定性

/**
 * 批量任务处理：
 * 1. 收集任务到任务队列，当任务超过50条或者最后一个任务添加2s后执行任务
 * 2. 执行任务时要将任务根据 errorType 和 message 进行分组
 * 3. 每组的任务小于等于5个时，为普通任务，直接通过 scheduler进行上报。每组的任务大于5个时，为批量任务。
 *
 * 批量任务处理逻辑：
 * 1. 每隔20s上报一次批量任务，在这期间，收集所有的批量任务到 batchTasks 队列
 * 2. 再次收集到批量任务时，要和已经收集的batchTasks进行再次合并，最终统一上报
 *
 */

class BatchScheduler {
  tasks: EventInfo[] = []
  batchTasks: EventInfo[] = []
  timerId: TimerId | null = null
  batchTimerId: TimerId | null = null

  constructor () {
  }

  addTask = (task: EventInfo) => {
    this.tasks.push(task)
    if (this.timerId) {
      clearTimeout(this.timerId)
      this.timerId = null
    }
    if (this.tasks.length >= 50) {
      this.runTasks()
    } else {
      this.timerId = setTimeout(() => {
        this.runTasks()
        this.timerId = null
      }, 2000)
    }
  }

  mergeBatchTasks = (tasks: EventInfo[]) => {
    // 将缓存的批量任务和新加入的批量任务继续进行合并
    const groupTasks = groupError([...this.batchTasks, ...tasks])
    this.batchTasks = groupTasks.map((group) => {
      const task = group[0]
      const batchErrorLength = group.reduce((acc: number, item) => {
        acc += item.batchErrorLength!
        return acc
      }, 0)
      const batchErrorLastHappenTime = group[group.length - 1].batchErrorLastHappenTime
      return {
        ...task,
        batchErrorLength,
        batchErrorLastHappenTime,
      }
    })
  }

  runTasks = () => {
    const groupTasks = groupError(this.tasks)
    const plainTasks = groupTasks.filter((item) => item.length <= 5)
    scheduler.addTask(plainTasks.flat(Infinity))

    const batchTasks = groupTasks.filter((item) => item.length > 5)
    const mergedBatchTasks = batchTasks.map((items) => {
      const item = items[0]
      const batchErrorLength = items.length
      const batchErrorLastHappenTime = items[items.length - 1].triggerTime
      return {
        ...item,
        batchErrorLength,
        batchErrorLastHappenTime
      }
    })
    this.tasks = []
    this.mergeBatchTasks(mergedBatchTasks)
    if (!this.batchTimerId) {
      this.runBatchTasks()
    }
  }

  runBatchTasks = () => {
    this.batchTimerId = setTimeout(() => {
      scheduler.addTask(this.batchTasks)
      this.batchTasks = []
      this.batchTimerId = null
    }, 20000)
  }
}

export let batchScheduler: BatchScheduler

export const createBatchScheduler = () => {
  batchScheduler = new BatchScheduler()
}
