const { Sequelize } = require('sequelize')
const { MYSQL_HOST, MYSQL_TYPE, MYSQL_USER, MYSQL_PWD, MYSQL_DB, MYSQL_TIME } = require('../config/config.default')
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: MYSQL_TYPE,
  timezone: MYSQL_TIME
})

// test
// seq
//   .authenticate()
//   .then(() => {
//     console.log('database connection ok')
//   })
//   .catch((err) => {
//     console.log('database connection failure', err)
//   })

module.exports = seq
