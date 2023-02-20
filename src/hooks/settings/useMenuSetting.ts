import type { MenuSetting } from '/#/config'
import { computed, ref, unref } from 'vue'
import { useAppStoreWithOut } from '@/stores/models/app'
import { useFullContent } from '@/hooks/web/useFullContent'
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '/@/enums/appEnum'
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum'
export function useMenuSetting() {
  const { getFullContent: FullContext } = useFullContent()
  const appStore = useAppStoreWithOut()
}
