<template>
  <div :class="getWarpClass">
    <Tabs>
      <template>
        <div></div>
      </template>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { Tabs } from 'ant-design-vue'
// import TabRedo from './components/TabRedo.vue'
// import TabContent from './components/TabContent.vue'
// import FoldButton from './components/FoldButton.vue'
import { useDesign } from '@/hooks/web/useDesign'
const TabPane = Tabs.TabPane
const tabStore = useMultipleTabStore()
const { prefixCls } = useDesign('multiple-tabs')
const getTabState = computed(() =>
  tabStore.getTabList.filter((item) => {
    console.log(item)
  })
)
const getWarpClass = computed(() => [])
</script>

<style lang="less" scoped>
@import './index.less';
</style>
