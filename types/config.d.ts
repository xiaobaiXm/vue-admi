import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum'

import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum
} from '/@/enums/appEnum'
import { CacheTypeEnum } from '/@/enums/cacheEnum'

export interface GlobalConfig {
  title: string
  apiUrl: string
  uploadUrl?: string
  urlPrefix?: string
  shortName: string
}

export interface GlobalEnvConfig {
  // 网站标题
  VITE_GLOB_APP_TITLE: string
  // 服务接口url
  VITE_GLOB_API_URL: string
  //  服务接口url前缀
  VITE_GLOB_API_URL_PREFIX?: string
  // 项目缩写
  VITE_GLOB_APP_SHORT_NAME: string
  // 上传url
  VITE_GLOB_UPLOAD_URL?: string
}

export interface ProjectConfig {
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum
  // 是否显示配置按钮
  showSettingButton: boolean
  // 是否显示主题切换按钮
  showDarkModeToggle: boolean
  // 配置按钮的显示位置
  settingButtonPosition: SettingButtonPositionEnum
  // 许可模式
  permissionMode: PermissionModeEnum
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // 网站灰色模式，打开可能的哀悼日期
  grayMode: boolean
  // 是否开启弱色模式
  colorWeak: boolean
  // 主题颜色
  themeColor: string
  // 主界面全屏显示，菜单不显示，顶部
  fullContent: boolean
  // 内容的宽度
  contentMode: ContentEnum
  // 是否显示logo
  showLogo: boolean
  // 是否显示全局页脚
  showFooter: boolean
  // 菜单类型
  headerSetting: HeaderSetting
  // 菜单设置
  menuSetting: MenuSetting
  // 多菜单设置
  multiTabsSetting: MultiTabsSetting
  // 动画配置
  transitionSetting: TransitionSetting
  // page布局是否使能缓存
  openKeepAlive: boolean
  // 锁定屏幕时间
  lockTime: number
  // 显示面包屑
  showBreadCrumb: boolean
  // 显示面包屑图标
  showBreadCrumbIcon: boolean
  // 使用错误处理插件
  useErrorHandle: boolean
  // 是否打开回顶
  useOpenBackTop: boolean
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: boolean
  // 切换接口时是否删除未关闭消息并通知
  closeMessageOnSwitch: boolean
  // 切换接口时，是否取消已经发送但没有响应的http请求
  removeAllHttpPending: boolean
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean
  // Route basic switching animation
  basicTransition: RouterTransitionEnum
  // Whether to open page switching loading
  openPageLoading: boolean
  // Whether to open the top progress bar
  openNProgress: boolean
}

export interface MenuSetting {
  bgColor: string
  fixed: boolean
  collapsed: boolean
  siderHidden: boolean
  canDrag: boolean
  show: boolean
  hidden: boolean
  split: boolean
  menuWidth: number
  mode: MenuModeEnum
  type: MenuTypeEnum
  theme: ThemeEnum
  topMenuAlign: 'start' | 'center' | 'end'
  trigger: TriggerEnum
  accordion: boolean
  closeMixSidebarOnChange: boolean
  collapsedShowTitle: boolean
  mixSideTrigger: MixSidebarTriggerEnum
  mixSideFixed: boolean
}

export interface MultiTabsSetting {
  cache: boolean
  show: boolean
  showQuick: boolean
  canDrag: boolean
  showRedo: boolean
  showFold: boolean
}

export interface HeaderSetting {
  bgColor: string
  fixed: boolean
  show: boolean
  theme: ThemeEnum
  // 全屏打开
  showFullScreen: boolean
  // 是否显示锁屏
  useLockPage: boolean
  // 显示文件按钮
  showDoc: boolean
  // 显示消息中心按钮
  showNotice: boolean
  showSearch: boolean
}

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface LocaleSetting {
  showPicker: boolean
  // 当前语言
  locale: LocaleType
  // 默认语言
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}
