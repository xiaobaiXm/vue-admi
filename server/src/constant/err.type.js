module.exports = {
  userLoginError: {
    code: 10001,
    message: '登录失败 请稍后重试',
    data: null
  },
  userDoesNotExist: {
    code: 10002,
    message: '该用户不存在',
    data: null
  },
  invalidPassword: {
    code: 10003,
    message: '密码错误',
    data: null
  },
  userFormateError: {
    code: 10004,
    message: '账号/密码格式错误',
    data: null
  },
  getUserInfoError: {
    code: 10005,
    message: '获取用户信息失败',
    data: null
  },
  invalidToken: {
    code: 10006,
    message: '无效的token',
    data: null
  },
  tokenExpiredError: {
    code: 10007,
    message: 'token已过期',
    data: null
  }
}
