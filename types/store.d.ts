import { RoleInfo } from '@/api/system/model/userModel'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

export interface UserInfo {
  id: string | number
  username: string
  real_name: string
  avatar: string
  desc?: string
  home_path?: string
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
