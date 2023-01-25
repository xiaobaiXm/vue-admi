export interface RoleInfo {
  roleName: string
  value: string
}
export interface LoginData {
  username: string
  password: string
}
export interface LoginResultModel {
  userId: string | number
  token: string
  role: RoleInfo
}
export interface GetUserInfoModel {
  roles: RoleInfo[]
  userId: string | number
  username: string
  realName: string
  avatar: string
  desc?: string
}
