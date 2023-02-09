import type { Context, Next } from 'koa'
import userService from '../service/userService'
import { err } from '../constant/err.type'
import getLogger from '../logger'
export const verifyLogin = async (ctx: Context, next: Next) => {
	const { username, password } = ctx.request.body
	try {
		const result = await userService.getUserInfo({ username })
		if (!result) ctx.app.emit('error', err.userDoesNotExist, ctx)
		if (!(password === result.password)) ctx.app.emit('error', err.invalidPassword, ctx)
		ctx.state = result
	} catch (error) {
		getLogger.error(error)
		return ctx.app.emit('error', err.userLoginError, ctx)
	}
	return await next()
}
