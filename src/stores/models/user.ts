import type { UserInfo } from '/#/store'
import type { ErrorMessageMode } from '/#/axios'
import type { GetUserInfoModel, LoginData } from '@/api/system/model/userModel'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { store } from '@/stores'
import { RoleEnum } from '@/enums/roleEnum'
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { reqLoginApi, reqGetUserInfoApi, reqLogoutApi } from '@/api/system/user'
import { isArray } from '@/utils/is'
import { usePermissionStoreWithOut } from './permission'
import { router } from '@/router'
import { PageEnum } from '../../enums/pageEnum'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}
export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0
  }),
  actions: {
    async login(data: LoginData & { goHome?: boolean; mode: ErrorMessageMode }): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginData } = data
        const result = await reqLoginApi(loginData, mode)
        const { token } = result
        this.setToken(token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null
      const userInfo = await this.getUserInfoAction()
      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = usePermissionStoreWithOut()
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw)
          })
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
          permissionStore.setDynamicAddedRoute(true)
        }
      }
      goHome && (await router.replace(userInfo?.home_path || PageEnum.BASE_HOME))
      return userInfo
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const userInfo = await reqGetUserInfoApi()
      const { roles = [] } = userInfo
      if (isArray(roles)) {
        this.setRoleList(roles.map((item) => item.value) as RoleEnum[])
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setToken(info: string | undefined): void {
      this.token = info ? info : ''
      setAuthCache(TOKEN_KEY, info as string)
    },
    setRoleList(roleList: RoleEnum[]): void {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, roleList)
    },
    setSessionTimeout(flag: boolean): void {
      this.sessionTimeout = flag
    },
    async logout(goLogin = false) {
      if (this.token) {
        try {
          await reqLogoutApi()
        } catch (error) {
          console.log('注销登录失败')
        }
      }
      // 删除所有用户信息 跳转到登录页
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      goLogin && router.push(PageEnum.BASE_LOGIN)
    }
  },
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getSettionsTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
