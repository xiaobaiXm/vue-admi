import { defineStore } from 'pinia'

import { store } from '@/stores'

interface UserState {}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => {
    return {}
  },
  actions: {},
  getters: {}
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
