const Router = require('koa-router')

const router = new Router({
  prefix: '/user'
})

// controller
const {
  login,
  getInfo
} = require('../../controller/user.controller.js')

// middleware
const {
  verifyLogin,
  validator
} = require('../../middleware/user.middleware')

const {
  auth
} = require('../../middleware/auth.middleware')

// router
router
  .post('/login', validator, verifyLogin, login)
  .get('/', auth, getInfo)

module.exports = router
