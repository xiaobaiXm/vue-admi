import type { Context, Next } from 'koa'
import { err } from '../constant/err.type'
import { verfiy } from '../utils/auth'
export const auth = async (ctx: Context, next: Next) => {
	const { authorization = '' } = ctx.request.header
	const token = authorization.replace('Bearer ', '')
	const { user, error } = verfiy(token)
	if (error) {
		switch (error.name) {
			case 'TokenExpiredError':
				console.error('token已过期', error)
				return ctx.app.emit('error', err.tokenExpiredError, ctx)
			case 'JsonWebTokenError':
				console.error('无效的token', error)
				return ctx.app.emit('error', err.invalidToken, ctx)
		}
	}
	ctx.state = user
	return await next()
}
