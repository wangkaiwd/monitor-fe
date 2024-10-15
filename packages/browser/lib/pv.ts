import { getLocationHref, listen, replaceAop, report } from './utils'

export const initPV = () => {
  let from = getLocationHref()
  let popstateFired = false
  const historyReplacer = (origin: Function) => {
    return function (this: Window['history'], state: object, unused: string, url?: string) {
      popstateFired = false
      // todo: jump immediately ?
      const result = origin.call(this, state, unused, url)
      const to = getLocationHref()
      report({
        eventType: 'pv',
        action: 'navigation',
        from,
        to
      })
      from = to
      return result
    }
  }
  replaceAop(window.history, 'pushState', historyReplacer)

  replaceAop(window.history, 'replaceState', historyReplacer)

  listen(window, 'load', () => {
    popstateFired = false
    console.log('load')
    report({
      eventType: 'pv',
      action: 'reload',
      from,
      to: from
    })
  })

  listen(window, 'popstate', () => {
    popstateFired = true
    const to = getLocationHref()
    report({
      eventType: 'pv',
      action: 'navigation',
      from,
      to
    })
    from = to
  })

  listen(window, 'hashchange', (ev: HashChangeEvent) => {
    if (popstateFired) { // 在 hashchange之前触发过 popstate 事件，此时在 hashchange 事件中不用再次上报
      popstateFired = false
    } else {
      const { oldURL, newURL } = ev
      report({
        eventType: 'pv',
        action: 'navigation',
        from: oldURL,
        to: newURL
      })
      from = newURL
    }
  })
}
