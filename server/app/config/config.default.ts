import dotenv from 'dotenv'
dotenv.config()
const config = {
  server: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT
  },
  db: {
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_pwd: process.env.DB_PWD,
    db_db: process.env.DB_DB,
    db_time: process.env.DB_TIME
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_validity: process.env.JWT_VALIDITY
  },
  log: {
    appenders: {
      cheese: { type: 'file', filename: 'logs/cheese.log' },
      access: { type: 'file', filename: 'logs/access.log' },
      sql: { type: 'file', filename: 'logs/sql.log' }
    },
    categories: {
      default: { appenders: ['cheese'], level: 'error' },
      access: { appenders: ['access'], level: 'info' },
      sql: { appenders: ['sql'], level: 'info' }
    }
  }
}
export default config
