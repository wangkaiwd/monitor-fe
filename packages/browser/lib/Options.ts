import { MonitorOptions } from './types'
import { defaultOptions } from './defaultOptions'

class BaseOptions {
  options: Required<MonitorOptions>

  constructor (options: MonitorOptions) {
    this.options = {
      ...defaultOptions,
      ...options
    }
  }

  setOptions = (partial: Partial<MonitorOptions>) => {
    this.options = {
      ...this.options,
      ...partial,
    }
  }
}

export let baseOptions: BaseOptions

export const createBaseOptions = (options: MonitorOptions) => {
  baseOptions = new BaseOptions(options)
}
