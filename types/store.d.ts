import { RoleInfo } from '@/api/system/model/userModel'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

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

export interface BeforeMiniState {
  menuCollapsed?: boolean
  menuSplit?: boolean
  menuMode?: MenuModeEnum
  menuType?: MenuTypeEnum
}
