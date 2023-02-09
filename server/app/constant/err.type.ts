export const err = {
	userLoginError: {
		code: 10001,
		message: '登录失败 请稍后重试',
		result: null
	},
	userDoesNotExist: {
		code: 10002,
		message: '该用户不存在',
		result: null
	},
	invalidPassword: {
		code: 10003,
		message: '密码错误',
		result: null
	},
	userFormateError: {
		code: 10004,
		message: '账号/密码格式错误',
		result: null
	},
	getUserInfoError: {
		code: 10005,
		message: '获取用户信息失败',
		result: null
	},
	invalidToken: {
		code: 10006,
		message: '无效的token',
		result: null
	},
	tokenExpiredError: {
		code: 10007,
		message: 'token已过期',
		result: null
	},
	uploadUserAvatarrFailure: {
		code: 10008,
		message: '上传用户头像失败',
		result: null
	},
	typeOfFileIsNotSupported: {
		code: 10009,
		message: '文件类型不支持',
		result: null
	}
}
