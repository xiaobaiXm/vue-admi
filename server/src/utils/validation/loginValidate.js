/* eslint-disable no-constant-condition */
const { isEmpty } = require('../index')
const Validator = require('validator')

module.exports = function validateLogin (data) {
  const err = {}
  let { username, password } = data

  username = !isEmpty(username) ? username : ''
  password = !isEmpty(password) ? password : ''

  if (!Validator.isLength(username, { min: 5, max: 12 })) {
    err.username = '名字长度不能小于5位且不能超过12位'
  }

  if (Validator.isEmpty(username)) {
    err.username = '账号不能为空'
  }

  if (!Validator.isLength(password, { min: 6, max: 12 })) {
    err.password = '密码长度不能小于6位且不能超过12位'
  }

  if (Validator.isEmpty(password)) {
    err.password = '密码不能为空'
  }

  return {
    err,
    valid: isEmpty(err)
  }
}
