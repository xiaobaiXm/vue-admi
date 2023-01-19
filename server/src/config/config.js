const path = require('path')

const corsConfig = {
  origin: (ctx) => {
    if (ctx.url === '/api') {
      return '*'
    }
    return 'http:localhost:8080'
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']
}

const koaBodyConfig = {
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../upload'),
    keepExtensions: true
  },
  parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}

module.exports = {
  corsConfig,
  koaBodyConfig
}
