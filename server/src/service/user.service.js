const User = require('../model/user.model')

// 连接 user 数据库
class UserService {
  // get user info
  async getUserInfo ({ id, username, password, isAdmin }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    username && Object.assign(whereOpt, { username })
    password && Object.assign(whereOpt, { password })
    isAdmin && Object.assign(whereOpt, { isAdmin })
    const res = await User.findOne({
      attributes: ['id', 'username', 'password', 'isAdmin'],
      where: whereOpt
    })
    return res ? res.dataValues : null
  }
}

module.exports = new UserService()
