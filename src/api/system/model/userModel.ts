export interface RoleInfo {
  role_name: string
  value: string
}
export interface LoginData {
  username: string
  password: string
}
export interface LoginResultModel {
  user_id: string | number
  token: string
  role: RoleInfo
}
export interface GetUserInfoModel {
  roles: RoleInfo[]
  id: string | number
  username: string
  real_name: string
  avatar: string
  desc?: string
  home_path?: string
}
