const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// create user model
const User = seq.define('admin_user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'user name'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'password'
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为超级管理员:0 不是超级管理员(默认值)'
  }
})

// synchronizing databases
// User.sync({
//   force: true
// })

module.exports = User
