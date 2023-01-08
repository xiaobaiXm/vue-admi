import { RoleInfo } from '@/api/system/model/userModel'

export interface UserInfo {
  userId: string | number
  name: string
  realName: string
  avatar: string
  desc?: string
  homePath: string
  roles: RoleInfo[]
}

export interface LockInfo {
  pwd?: string | undefined
  isLock?: boolean
}
