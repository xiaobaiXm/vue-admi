const Koa = require('Koa')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const parameter = require('koa-parameter')

const router = require('../routers/index')
const errHandler = require('./errHandler')

const { corsConfig, koaBodyConfig } = require('../config/config')

const app = new Koa()

app.use(koaBody(koaBodyConfig))

app.use(parameter(app))

// register router
app.use(router.routes()).use(router.allowedMethods())

app.on('error', errHandler)

app.use(cors(corsConfig))

module.exports = app
