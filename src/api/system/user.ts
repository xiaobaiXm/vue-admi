import type { ErrorMessageMode } from '/#/axios'
import type { LoginData, LoginResultModel, GetUserInfoModel } from './model/userModel'
import { request } from '@/utils/http'
enum Api {
  Login = '/user/login',
  Logout = '/user/logout',
  GetUserInfo = '/user/',
  UploadUserAvatar = '/upload/user/avatar'
}
// login api
export const reqLoginApi = (userInfo: LoginData, mode: ErrorMessageMode = 'modal') => {
  return request.post<LoginResultModel>(
    {
      url: Api.Login,
      data: userInfo
    },
    { errorMessageMode: mode }
  )
}
// get user info api
export const reqGetUserInfoApi = () => {
  return request.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })
}
// logout api
export const reqLogoutApi = () => {
  return request.post({ url: Api.Logout })
}
// upload user avatar api
export const reqUploadAvatarApi = () => {
  return request.post({ url: Api.UploadUserAvatar }, { errorMessageMode: 'modal' })
}
