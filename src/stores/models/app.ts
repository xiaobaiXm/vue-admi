import { defineStore } from 'pinia'
import { store } from '..'

interface AppState {}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {}
  },
  actions: {},
  getters: {}
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
