<!-- eslint-disable vue/valid-template-root -->
<template></template>
<script lang="ts">
import { prefixCls } from '@/settings/designSetting'
import { createBreakpointListen } from '@/hooks/event/useBreakpoint'
import { createAppProviderContext } from '@/components/Application/src/useAppContext'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'
const props = {
  prefixCls: {
    type: String,
    default: prefixCls
  }
}
export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const isMobile = ref(false)
    const isSetState = ref(false)
    const appStore = useAppStore()
    createBreakpointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG)
      if (lgWidth) {
        isMobile.value = width.value - 1 < lgWidth
      }
      handleRestoreState()
    })
    const { prefixCls } = toRefs(props)
    createAppProviderContext({ prefixCls, isMobile })

    function handleRestoreState() {
      if (!unref(isMobile)) {
        isSetState.value = true
        const {
          menuSetting: { type: menuType, mode: menuMode, collapsed: menuCollapsed, split: menuSplit }
        } = appStore.getProjectConfig
        appStore.setProjectConfig({
          menuSetting: { type: MenuTypeEnum.SIDEBAR, mode: MenuModeEnum.INLINE, split: false }
        })
        appStore.setBeforeMiniInfo({ menuMode, menuCollapsed, menuType, menuSplit })
      } else {
        if (unref(isSetState)) {
          isSetState.value = false
          const { menuMode, menuCollapsed, menuType, menuSplit } = appStore.getBeforeMiniInfo
          appStore.setProjectConfig({
            menuSetting: { type: menuType, mode: menuMode, collapsed: menuCollapsed, split: menuSplit }
          })
        }
      }
    }
    return () => slots.default?.()
  }
})
</script>
