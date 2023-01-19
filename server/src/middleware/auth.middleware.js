const JWT = require('jsonwebtoken')

const {
  tokenExpiredError,
  invalidToken
} = require('../constant/err.type')

const {
  JWT_SECRET
} = require('../config/config.default')

const auth = async (ctx, next) => {
  const authorization = ctx.request.header.token
  const token = authorization.replace('Bearer ', '')

  try {
    const user = JWT.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', err)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }
  await next()
}

module.exports = {
  auth
}
