import type { Server } from 'http'
import Koa from 'koa'
import koaBody from 'koa-body'
import router from './router'
import db from './db'
import accessLogMiddleware from './middleware/accsessLogMiddleware'
import config from './config/config.default'
db()
const app = new Koa()
app.use(koaBody()).use(accessLogMiddleware).use(router.routes()).use(router.allowedMethods())
app.on('errror', (err, ctx) => {
	const status = 200
	ctx.status = status
	ctx.body = err
})
const run = (port: string | number | undefined): Server => {
	return app.listen(port, () => {
		console.log(`app is running at ${config.server.host}${port}`)
	})
}

export default run
