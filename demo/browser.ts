import BaseClient from './core/baseClient'
import ClientError from './integrations/clientError'
import Action from './integrations/action'

export const init = (options: any) => {
  const client = new BaseClient(options)
  client.init()
  return client
}

init({
  dsn: 'http:tracker.example.com/api/apppId',
  integrations: [
    new ClientError(),
    new Action()
  ]
})

