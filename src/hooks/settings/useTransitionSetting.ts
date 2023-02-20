import type { TransitionSetting } from '/#/config'
import { computed } from 'vue'
import { useAppStoreWithOut } from '@/stores/models/app'
export function useTransitionSetting() {
  const appStore = useAppStoreWithOut()
  const getEnableTransition = computed(() => appStore.getTransitionSetting?.enable)
  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress)
  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading
  })
  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting })
  }
  const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition)
  return {
    setTransitionSetting,
    getBasicTransition,
    getOpenNProgress,
    getEnableTransition,
    getOpenPageLoading
  }
}
