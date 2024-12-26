import Transport from '../transport'

class BaseClient {
  options: any
  transport: Transport

  constructor (options: any) {
    this.options = options
    this.transport = new Transport(options)
  }

  init () {
    const { integrations } = this.options
    integrations.forEach((integration: any) => {
      // todo: this is suitable ?
      integration.setup(this)
    })
  }

}

export default BaseClient
