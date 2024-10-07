import { getTarget, listen, report, replaceAop } from './utils'

const jsErrorHandler = () => {
  listen(window, 'error', (ev: ErrorEvent) => {
    const { lineno, colno, message, filename, error } = ev
    report({
      lineno,
      colno,
      message,
      filename,
      stack: error.stack,
      errorType: 'js',
      eventType: 'error',
    })
  })
}

const promiseErrorHandler = () => {
  listen(window, 'unhandledrejection', (ev: PromiseRejectionEvent) => {
    report({ eventType: 'error', errorType: 'promise', message: ev.reason })
  })
}

// resource: link, script, img, audio, video
const resourceLoadingErrorHandler = () => {
  listen(document, 'error', (ev: ErrorEvent) => {
    // script, img, audio, video use src property
    // link use href property
    const resourceUrl = (ev.target as any).src ?? (ev.target as any).href
    const target = getTarget(ev)
    report({
      eventType: 'resource',
      target,
      resourceUrl,
    })
  }, true)
}

interface HTTPReportProps {
  url: string
  method: string
  body?: any
  status?: number
  response?: string
}

interface MonitorXMLHttpRequest extends XMLHttpRequest {
  httpReportProps?: HTTPReportProps
}

const xhrErrorHandler = () => {
  replaceAop(XMLHttpRequest.prototype, 'open', (origin: Function) => {
    return function (this: MonitorXMLHttpRequest, ...args: any[]) {
      const [method, url] = args
      this.httpReportProps = {
        method,
        url,
      }
      return origin.apply(this, args)
    }
  })

  replaceAop(XMLHttpRequest.prototype, 'send', (origin: Function) => {
    return function (this: MonitorXMLHttpRequest, body: any) {
      const result = origin.call(this, body)
      this.addEventListener('loadend', (ev: ProgressEvent<XMLHttpRequestEventTarget>) => {
        const { status, responseText, httpReportProps } = ev.target as MonitorXMLHttpRequest
        if (status === 0 || !(status >= 200 && status < 300)) {
          if (httpReportProps) {
            httpReportProps.status = status
            httpReportProps.body = body
            httpReportProps.response = responseText
            report({ ...httpReportProps, errorType: 'xhr', eventType: 'error' })
            delete (ev.target as MonitorXMLHttpRequest).httpReportProps
          }
        }
      })
      return result
    }
  })
}

export const setupError = () => {
  jsErrorHandler()
  promiseErrorHandler()
  resourceLoadingErrorHandler()
  xhrErrorHandler()
}
