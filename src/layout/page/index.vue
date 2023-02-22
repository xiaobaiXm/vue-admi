<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            openCache,
            cacheTabs: getCacheTabList,
            enableTransition: getEnableTransition,
            def: getBasicTransition
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCacheTabList">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <div v-else :key="route.name as string">
          <component :is="Component" :key="route.fullPath" />
        </div>
      </transition>
    </template>
  </RouterView>
</template>

<script setup lang="ts">
import { useRootSetting } from '@/hooks/settings/useRootSetting'
import { useTransitionSetting } from '@/hooks/settings/useTransitionSetting'
import { useMultipleTabSetting } from '@/hooks/settings/useMultipleTabSetting'
import getTransitionName from './transition'
const tabStore = useMultipleTabStore()
const { getOpenKeepAlive } = useRootSetting()
const { getBasicTransition, getEnableTransition } = useTransitionSetting()
const { getShowMultipleTab } = useMultipleTabSetting()
const openCache = computed((): boolean => unref(getOpenKeepAlive) && unref(getShowMultipleTab))
const getCacheTabList = computed((): string[] => {
  if (!unref(getOpenKeepAlive)) return []
  return tabStore.getCaCheTabList
})
</script>

<style lang="less" scoped></style>
