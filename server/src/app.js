const { APP_PORT } = require('./config/config.default')

const app = require('./app/index')

// listen serve
app.listen(APP_PORT, () => {
  console.log(`Serve is running at http://127.0.0.1:${APP_PORT}`)
})
