import type { Context } from 'koa'
import { sign } from '../utils/auth'
import getLogger from '../logger'
import { err } from '../constant/err.type'
import userService from '../service/userService'
class UserController {
	async register(ctx: Context) {}
	async login(ctx: Context) {
		const { password, ...result } = ctx.state
		ctx.body = {
			code: 200,
			messgae: '登录成功',
			result: {
				token: sign(result)
			}
		}
	}
	async gerUserInfo(ctx: Context) {
		const id = ctx.state.user
		try {
			const { password, ...result } = await userService.getUserInfo({ id })
			ctx.body = {
				code: 200,
				message: '获取用户信息成功',
				result
			}
		} catch (error) {
			getLogger.error(error)
			ctx.app.emit('error', err.getUserInfoError, ctx)
		}
	}
}

export default new UserController()
