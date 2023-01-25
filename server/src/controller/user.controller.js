const JWT = require('jsonwebtoken')
const { getUserInfo } = require('../service/user.service')
const { userLoginError, getUserInfoError } = require('../constant/err.type')
const { JWT_SECRET, JWT_VALIDITY } = require('../config/config.default')

class UserController {
  // login
  async login(ctx) {
    const { username } = ctx.request.body
    try {
      const { password, ...res } = await getUserInfo({ username })
      ctx.body = {
        code: 200,
        message: '登录成功',
        result: {
          token: JWT.sign(res, JWT_SECRET, { expiresIn: JWT_VALIDITY })
        }
      }
    } catch (err) {
      console.error('登录失败', err)
      ctx.app.emit('error', userLoginError, ctx)
    }
  }
  // get user info
  async getInfo(ctx) {
    const { id } = ctx.state.user
    try {
      ctx.body = {
        code: 200,
        message: '获取用户信息成功',
        data: await getUserInfo({ id })
      }
    } catch (error) {
      console.log('获取用户信息失败', error)
      ctx.app.emit('error', getUserInfoError, ctx)
    }
  }
}

module.exports = new UserController()
