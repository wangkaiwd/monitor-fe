import { afterEach, describe, it, vi } from 'vitest'
import { init } from '../lib/init'
import { beforeEach } from 'node:test'

// const triggerErrorEvent = () => {
//   const errorEvent = new ErrorEvent('error', {
//     colno: 10,
//     lineno: 10,
//     message: 'code error',
//     error: new Error('code error'),
//     filename: 'test.js',
//   })
//   window.dispatchEvent(errorEvent)
// }

describe('report error', () => {
  const navigatorMock = {
    sendBeacon: vi.fn()
  }
  vi.stubGlobal('navigator', navigatorMock)

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })
  beforeEach(() => {
    init({ appId: 'appId', userId: 'userId' })
  })

  it('should report js error', () => {

  })
})
