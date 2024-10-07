import Koa from 'koa'
import { bodyParser } from '@koa/bodyparser'
import Router from '@koa/router'
import cors from '@koa/cors'

const PORT = 3000
const router = new Router()
const app = new Koa()
app.use(
  bodyParser({ enableTypes: ['json', 'form', 'text'], encoding: 'utf-8' }))

app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

router.get('/errors/demo', (ctx) => {
  ctx.status = 500
  ctx.body = {
    message: 'Server internal error',
  }
})

router.post('/errors/upload', (ctx) => {
  console.log('ctx', ctx.request.body)
  ctx.body = {
    message: 'Report successfully',
  }
  // ctx.body = 'Report successfully'
})
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
