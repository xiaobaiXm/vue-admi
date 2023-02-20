import type { Context, Next } from 'koa'
import { accessLogger } from '../logger'
function accessLogMiddleware(ctx: Context, next: Next) {
  const logString = `path:${ctx.path} | method:${ctx.method} | us:${ctx.headers['user-agent']}`
  accessLogger.info(logString)
  return next()
}

export default accessLogMiddleware
