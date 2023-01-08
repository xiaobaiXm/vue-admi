import type { ProjectConfig } from '/#/config'
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '@/enums/menuEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum
} from '@/enums/appEnum'
import { primaryColor } from '../../build/config/themeConfig'
// app 全局信息
const setting: ProjectConfig = {
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum.LOCAL,
  // 是否显示配置按钮
  showSettingButton: true,
  // 是否显示主题切换按钮
  showDarkModeToggle: true,
  // 配置按钮的显示位置
  settingButtonPosition: SettingButtonPositionEnum.AUTO,
  // 许可模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  // 网站灰色模式，打开可能的哀悼日期
  grayMode: false,
  // 是否开启弱色模式
  colorWeak: false,
  // 主题颜色
  themeColor: primaryColor,
  // 主界面全屏显示，菜单不显示，顶部
  fullContent: false,
  // 内容的宽度
  contentMode: ContentEnum.FULL,
  // 是否显示logo
  showLogo: true,
  // 是否显示全局页脚
  showFooter: false,
  // 菜单类型
  headerSetting: {
    // 头部背景颜色
    bgColor: '',
    // 固定在顶部
    fixed: true,
    // 是否显示top
    show: true,
    // 主题
    theme: ThemeEnum.LIGHT,
    // 是否开启锁屏功能
    useLockPage: true,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示文档按钮
    showDoc: true,
    // 是否显示通知按钮
    showNotice: true,
    // 是否显示菜单搜索
    showSearch: true
  },
  // 菜单设置
  menuSetting: {
    // 侧边菜单栏背景颜色
    bgColor: '',
    //  是否修复左侧菜单
    fixed: true,
    // 菜单崩溃
    collapsed: false,
    // 当侧面隐藏，因为响应式布局
    siderHidden: false,
    // 折叠菜单时是否显示菜单名称
    collapsedShowTitle: false,
    // 是否可以拖动
    // 仅局限于左侧菜单的打开，鼠标在菜单右侧有一个拖拽栏
    canDrag: false,
    // 是否显示没有dom
    show: true,
    // 是否显示dom
    hidden: false,
    // 菜单的宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 菜单主题
    theme: ThemeEnum.DARK,
    // 分裂菜单
    split: false,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // 折叠触发器位置
    trigger: TriggerEnum.HEADER,
    // 打开手风琴模式，只显示菜单
    accordion: true,
    // 切换页面以关闭菜单
    closeMixSidebarOnChange: false,
    // 模块打开方法'点击' |'悬停'
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // 固定扩展菜单
    mixSideFixed: false
  },
  // 多菜单设置
  multiTabsSetting: {
    cache: false,
    // 打开
    show: true,
    // 是否可以拖放排序标签
    canDrag: true,
    // 开启快速动作
    showQuick: true,
    // 是否显示刷新按钮
    showRedo: true,
    // 是否显示折叠按钮
    showFold: true
  },
  // 动画配置
  transitionSetting: {
    // 是否打开页面切换动画
    // 禁用状态也会禁用页面加载
    enable: true,
    // 路由基本切换动画
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    // 是否打开页面切换加载
    // 仅当enable=true时打开
    openPageLoading: true,
    // 是否打开顶部进度条
    openNProgress: false
  },
  // page布局是否使能缓存
  openKeepAlive: true,
  // 锁定屏幕时间
  lockTime: 0,
  // 显示面包屑
  showBreadCrumb: true,
  // 显示面包屑图标
  showBreadCrumbIcon: false,
  // 使用错误处理插件
  useErrorHandle: false,
  // 是否打开回顶
  useOpenBackTop: true,
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: true,
  // 切换接口时是否删除未关闭消息并通知
  closeMessageOnSwitch: true,
  // 切换接口时，是否取消已经发送但没有响应的http请求
  removeAllHttpPending: false
}

export default setting
