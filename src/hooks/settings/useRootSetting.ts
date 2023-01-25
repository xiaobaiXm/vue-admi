import type { ProjectConfig } from '/#/config'
import { computed } from 'vue'
import { useAppStoreWithOut } from '@/stores/models/app'
import { ContentEnum, ThemeEnum } from '@/enums/appEnum'
type RootSetting = Omit<ProjectConfig, 'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'>
export function useRootSetting() {
  const appStore = useAppStoreWithOut()
  // 获取页面加载状态
  const getPageLoading = computed(() => appStore.getPageLoading)
  // 获取主题模式
  const getDarkMode = computed(() => appStore.getDarkMode)
  // 是否开启缓存
  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive)
  // 获取按钮位置
  const getButtonPostion = computed(() => appStore.getProjectConfig.settingButtonPosition)
  // 是否嵌入帧页面
  const getCanEmbedIFramePage = computed(() => appStore.getProjectConfig.canEmbedIFramePage)
  // 权限模式
  const getPermissionMode = computed(() => appStore.getProjectConfig.permissionMode)
  // 是否显示logo
  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo)
  // 获取容器模式
  const getContentMode = computed(() => appStore.getProjectConfig.contentMode)
  // 打开回到顶部
  const getUseOpenBackTop = computed(() => appStore.getProjectConfig.useOpenBackTop)
  // 打开显示设置按钮
  const getShowSettingButton = computed(() => appStore.getProjectConfig.showSettingButton)
  // 打开错误处理
  const getUseErrorHandle = computed(() => appStore.getProjectConfig.useErrorHandle)
  // 显示页脚
  const getShowFooter = computed(() => appStore.getProjectConfig.showFooter)
  // 显示面包屑
  const getShowBreadCrumb = computed(() => appStore.getProjectConfig.showBreadCrumb)
  // 获取主题颜色
  const getThemeColor = computed(() => appStore.getProjectConfig.themeColor)
  // 显示面包屑图标
  const getShowBreadCrumbIcon = computed(() => appStore.getProjectConfig.showBreadCrumbIcon)
  // 获取完整内容
  const getFullContent = computed(() => appStore.getProjectConfig.fullContent)
  // 获取颜色变淡
  const getColorWeak = computed(() => appStore.getProjectConfig.colorWeak)
  // 获得灰色模式
  const getGrayMode = computed(() => appStore.getProjectConfig.grayMode)
  // 显示暗模式切换
  const getShowDarkModeToggle = computed(() => appStore.getProjectConfig.showDarkModeToggle)
  // 获取布局内容模式
  const getLayoutContentMode = computed(() => {
    return appStore.getProjectConfig.contentMode === ContentEnum.FULL ? ContentEnum.FULL : ContentEnum.FIXED
  })
  function setRootSetting(setting: Partial<RootSetting>): void {
    appStore.setProjectConfig(setting)
  }
  function setDarkMode(mode: ThemeEnum): void {
    appStore.setDarkMode(mode)
  }
  return {
    getPageLoading,
    getDarkMode,
    getOpenKeepAlive,
    getButtonPostion,
    getCanEmbedIFramePage,
    getPermissionMode,
    getShowLogo,
    getContentMode,
    getUseOpenBackTop,
    getShowSettingButton,
    getUseErrorHandle,
    getShowFooter,
    getShowBreadCrumb,
    getThemeColor,
    getShowBreadCrumbIcon,
    getFullContent,
    getColorWeak,
    getGrayMode,
    getShowDarkModeToggle,
    getLayoutContentMode,
    setRootSetting,
    setDarkMode
  }
}
