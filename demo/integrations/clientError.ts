import BaseClient from '../core/baseClient'

class ClientError {
  constructor () {}

  setup (client: BaseClient) {
    window.addEventListener('error', async (e) => {
      console.log(e)
      await client.transport.send({
        type: 'jsError',
        error: e
      })
    })
  }
}

export default ClientError
