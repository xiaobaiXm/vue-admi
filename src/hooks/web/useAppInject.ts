import { useAppProviderContext } from '@/components/Application'
import { computed, unref } from 'vue'
export function useAppInject() {
  const value = useAppProviderContext()
  return {
    getIsMobile: computed((): boolean => unref(value.isMobile))
  }
}
