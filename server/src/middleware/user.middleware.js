const bcrypt = require('bcryptjs')

const {
  userFormatError,
  userDoesNotExist,
  userLoginError,
  invalidPassword
} = require('../constant/err.type')

const {
  getUserInfo
} = require('../service/user.service')

const validateLogin = require('../utils/validation/loginValidate')

const validator = async (ctx, next) => {
  const { err, valid } = validateLogin(ctx.request.body)
  if (!valid) {
    userFormatError.data = err
    return ctx.app.emit('error', userFormatError, ctx)
  }
  await next()
}

const cryptPassword = async (ctx, next) => {
  const {
    password
  } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

const verifyLogin = async (ctx, next) => {
  const {
    username,
    password
  } = ctx.request.body
  try {
    const res = await getUserInfo({ username })
    if (!res) {
      console.error('用户名不存在', { username })
      return ctx.app.emit('error', userDoesNotExist, ctx)
    }
    if (!(res.password === password)) {
      return ctx.app.emit('error', invalidPassword, ctx)
    }
  } catch (err) {
    console.error(err)
    return ctx.app.emit('error', userLoginError, ctx)
  }
  await next()
}

const schema = (method, schemas) => {
  const validateSchema = async (ctx, next) => {
    let data = null
    if (method === 'get') {
      data = await ctx.request.query
    } else {
      data = await ctx.request.body
    }
    const { err } = schemas.validate(data)
    if (err) {
      return console.err(err)
    }
    await next()
  }
  return validateSchema
}

module.exports = {
  validator,
  cryptPassword,
  verifyLogin,
  schema
}
