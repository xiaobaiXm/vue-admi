const fs = require('fs')
const path = require('path')

const Router = require('koa-router')
const router = new Router()

// management router
const pathUrl = path.join(__dirname, 'router')

fs.readdirSync(pathUrl).forEach(file => {
  const r = require('./router/' + file)
  router.use(r.routes())
})

module.exports = router
