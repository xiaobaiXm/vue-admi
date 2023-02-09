import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import config from '../config/config.default'
import { sqlLogger } from '../logger'
const sequelize = new Sequelize(config.db.db_db as string, config.db.db_user as string, config.db.db_pwd, {
	host: config.db.db_host,
	port: config.db.db_port as unknown as number,
	dialect: 'mysql',
	timezone: config.db.db_time as string,
	define: {
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at'
	},
	logging: msg => sqlLogger.info(msg),
	models: [path.join(__dirname, '..', 'models/**/*.ts'), path.join(__dirname, '..', 'models/**/*.js')]
})

const db = async () => {
	try {
		console.log('database connection success')
		await sequelize.authenticate()
	} catch (error) {
		console.log('database connection failure', error)
	}
}
export default db
