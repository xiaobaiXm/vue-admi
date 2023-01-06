import { defineStore } from 'pinia'

import { store } from '..'

interface UserState {}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {}
  },
  actions: {},
  getters: {}
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
