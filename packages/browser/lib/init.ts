import { reportClick } from './collect'
import { createPerformanceObserver } from './performance'
import { setupError as initError } from './error'
import { MonitorOptions } from './types'
import { createScheduler } from './Scheduler'
import { baseOptions, createBaseOptions } from './Options'
import { createBreadcrumbs } from './Breadcrumbs'

const initPerformance = () => {
  createPerformanceObserver()
}

const initBehavior = () => {
  const { collect } = baseOptions.options
  if (collect.click) {
    // must trigger it in capture phase, ensure it before error event
    window.addEventListener('click', (ev: Event) => {
      reportClick(ev)
    }, true)
  }
}

export const init = (options: MonitorOptions) => {
  // Must ensure execute order
  // after method will use global variable which created in before
  createBaseOptions(options)
  createScheduler()
  createBreadcrumbs()

  initPerformance()
  initError()
  initBehavior()
}
