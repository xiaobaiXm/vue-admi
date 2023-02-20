import type { MultiTabsSetting } from '/#/config'
import { computed } from 'vue'
import { useAppStoreWithOut } from '@/stores/models/app'
export function useMultipleTabSetting() {
  const appStore = useAppStoreWithOut()
  const getShowMultipleTab = computed(() => appStore.getMultiTabsSetting.show)
  const getShowQuick = computed(() => appStore.getMultiTabsSetting.showQuick)
  const getShowRedo = computed(() => appStore.getMultiTabsSetting.showRedo)
  const getShowFold = computed(() => appStore.getMultiTabsSetting.showFold)
  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
    appStore.setProjectConfig({ multiTabsSetting })
  }
  return {
    setMultipleTabSetting,
    getShowMultipleTab,
    getShowQuick,
    getShowRedo,
    getShowFold
  }
}
