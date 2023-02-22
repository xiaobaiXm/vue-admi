import type { MenuSetting } from '/#/config'
import { computed, ref, unref } from 'vue'
import { useAppStoreWithOut } from '@/stores/models/app'
import { useFullContent } from '@/hooks/web/useFullContent'
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '@/enums/appEnum'
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '@/enums/menuEnum'
const mixSideHasChildren = ref(false)
export function useMenuSetting() {
  const { getFullContent: FullContext } = useFullContent()

  const appStore = useAppStoreWithOut()
  // 分裂菜单
  const getSplit = computed(() => appStore.getMenuSetting.split)
  // 显示菜单
  const getShowMenu = computed(() => appStore.getMenuSetting.show)
  // 菜单模式
  const getMenuMode = computed(() => appStore.getMenuSetting.mode)
  // 是否收缩
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)
  // 获取菜单类型
  const getMenuType = computed(() => appStore.getMenuSetting.type)
  // 固定菜单
  const getMenuFixed = computed(() => appStore.getMenuSetting.fixed)
  // 隐藏菜单
  const getMenuHidden = computed(() => appStore.getMenuSetting.hidden)
  // 菜单宽度
  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)
  // 触发模式
  const getMenuTrigger = computed(() => appStore.getMenuSetting.trigger)
  // 菜单主题
  const getMenuTheme = computed(() => appStore.getMenuSetting.theme)
  // 背景颜色
  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor)
  // 缩小菜单触发
  const getMixSiderTrigger = computed(() => appStore.getMenuSetting.mixSideTrigger)
  // 缩小菜单固定
  const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed)
  // 顶部菜单对齐
  const getTopMenuAlign = computed(() => appStore.getMenuSetting.topMenuAlign)
  // 切换页面以关闭菜单
  const getCloseMixSidebarOnChange = computed(() => appStore.getMenuSetting.closeMixSidebarOnChange)

  const getCollapsedShowTitle = computed(() => appStore.getMenuSetting.collapsedShowTitle)
  // 是否可以拖动
  const getCanDrag = computed(() => appStore.getMenuSetting.canDrag)
  // 打开手风琴模式，只显示菜单
  const getAccordion = computed(() => appStore.getMenuSetting.accordion)

  const getIsSidebar = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR)

  const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU)

  // 是否显示侧边栏
  const getShowSider = computed(() => {
    return (
      unref(getSplit) || (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(FullContext))
    )
  })
  // 是否显示顶部菜单
  const getShowTopMenu = computed(() => unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit))
  // 是否显示头部触发器位置
  const getShowHeaderTrigger = computed(() => {
    if (unref(getMenuMode.value === MenuTypeEnum.TOP_MENU) || !unref(getShowMenu) || unref(getMenuHidden)) {
      return false
    }
    return unref(getMenuTrigger) === TriggerEnum.HEADER
  })
  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL
  })

  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR
  })

  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX
  })
  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
    }
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
  })

  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle, siderHidden } = appStore.getMenuSetting
    return siderHidden ? 0 : collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH
  })

  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
        ? 0
        : unref(getIsMixSidebar)
        ? (unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
          (unref(getMixSideFixed) && unref(mixSideHasChildren) ? unref(getRealWidth) : 0)
        : unref(getRealWidth)

    return `calc(100% - ${unref(width)}px)`
  })
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting })
  }
  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed)
    })
  }
  return {
    setMenuSetting,
    toggleCollapsed,
    getShowSider,
    getSplit,
    getShowMenu,
    getMenuMode,
    getCollapsed,
    getMenuType,
    getMenuFixed,
    getMenuHidden,
    getMenuWidth,
    getMenuTrigger,
    getMenuTheme,
    getMenuBgColor,
    getMixSiderTrigger,
    getMixSideFixed,
    getTopMenuAlign,
    getCloseMixSidebarOnChange,
    getCollapsedShowTitle,
    getCanDrag,
    getAccordion,
    getIsSidebar,
    getIsTopMenu,
    getShowTopMenu,
    getShowHeaderTrigger,
    getIsHorizontal,
    getIsMixSidebar,
    getIsMixMode,
    getCalcContentWidth,
    getRealWidth
  }
}
