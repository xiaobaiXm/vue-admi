import type { HeaderSetting } from '/#/config'
import { computed, unref } from 'vue'
import { useAppStoreWithOut } from '@/stores/models/app'
import { useFullContent } from '@/hooks/web/useFullContent'
import { useMenuSetting } from '@/hooks/settings/useMenuSetting'
import { useRootSetting } from '@/hooks/settings/useRootSetting'
import { MenuModeEnum } from '@/enums/menuEnum'
export function useHeaderSetting() {
  const appStore = useAppStoreWithOut()
  const { getFullContent } = useFullContent()
  const { getShowBreadCrumb, getShowLogo } = useRootSetting()
  const { getMenuMode, getIsSidebar, getSplit } = useMenuSetting()
  // 头部全屏显示
  const getShowFullHeaderRef = computed(() => {
    return !unref(getFullContent) && unref(getShowMixHeaderRef) && unref(getShowHeader)
  })
  // 显示头部
  const getShowHeader = computed(() => appStore.getHeaderSetting.show)
  // 显示mix头部
  const getShowMixHeaderRef = computed(() => !unref(getIsSidebar))
  // 显示面包屑
  const getShowBread = computed(
    () => unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit)
  )
  // 显示头部logo
  const getShowHeaderLogo = computed(() => unref(getShowLogo) && !unref(getIsSidebar) && !unref(getShowMixHeaderRef))
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>): void {
    appStore.setProjectConfig({ headerSetting })
  }
  return {
    setHeaderSetting,
    getShowFullHeaderRef,
    getShowHeader,
    getShowBread,
    getShowHeaderLogo
  }
}
