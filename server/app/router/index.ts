import fs from 'fs'
import path from 'path'
import Router from 'koa-router'
const router = new Router()
const pathUrl = path.join(__dirname, 'modules')
fs.readdirSync(pathUrl).forEach(async (file) => {
  const r = await import(`./modules/${file}`)
  router.use(r.default.routes())
})

export default router
