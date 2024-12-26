import BaseClient from '../core/baseClient'

class Action {
  constructor () {
  }

  setup (client: BaseClient) {
    window.addEventListener('load', async () => {
      await client.transport.send({
        type: 'pv'
      })
    })
  }
}

export default Action
