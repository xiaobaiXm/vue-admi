import jwt from 'jsonwebtoken'
import config from '../config/config.default'
export function sign(data: any) {
	return jwt.sign(data, config.jwt.jwt_secret as string, {
		expiresIn: config.jwt.jwt_validity
	})
}
export function verfiy(token: string) {
	try {
		const decoded = jwt.verify(token, config.jwt.jwt_secret as string)
		return {
			user: decoded,
			error: null
		}
	} catch (error: any) {
		return {
			user: null,
			error
		}
	}
}

export default {
	sign,
	verfiy
}
