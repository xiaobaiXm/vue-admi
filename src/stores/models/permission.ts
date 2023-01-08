import { defineStore } from 'pinia'
import { store } from '@/stores'

interface PermissionState {}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => {
    return {}
  },
  actions: {},
  getters: {}
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
