import { computed, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStoreWithOut } from '@/stores/models/app'
// 全屏显示
export function useFullContent() {
  const appStore = useAppStoreWithOut()
  const router = useRouter()
  const { currentRoute } = router
  // 是否全屏显示而不显示菜单
  const getFullContent = computed(() => {
    // 查询参数时，地址栏参数满时显示全屏
    const route = unref(currentRoute)
    const query = route.query
    if (query && Reflect.has(query, '__full__')) return true
    // Return to the configuration in the configuration file
    return appStore.projectConfig?.fullContent
  })
  return { getFullContent }
}
