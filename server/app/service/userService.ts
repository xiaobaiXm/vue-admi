import AdminUser from '../models/adminUser'
import Role from '../models/role'
type GetUserInfoParms = {
	id?: number
	username?: string
	password?: string
}
type CreateUserParms = {}
class UserService {
	async createUser(userInfo: CreateUserParms) {}
	async getUserInfo(parms: GetUserInfoParms): Promise<any | null> {
		const { id, username, password } = parms
		const whereOpt = {}
		id && Object.assign(whereOpt, { id })
		username && Object.assign(whereOpt, { username })
		password && Object.assign(whereOpt, { password })
		const result = await AdminUser.findOne({
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			include: {
				model: Role,
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				as: 'role'
			},
			where: whereOpt
		})
		return result ? result.dataValues : null
	}
}

export default new UserService()
