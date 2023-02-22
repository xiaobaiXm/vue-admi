<template>
  <Layout :class="[prefixCls]">
    <LayoutFeatrues />
    <LayoutHeader fixed v-if="getShowFullHeaderRef" />
    <Layout :class="layoutClass">
      <LayoutSideBar />
      <Layout :class="[`${prefixCls}-main`]">
        <LayoutMultipleHeader />
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import LayoutHeader from './components/Header/index.vue'
import LayoutSideBar from './components/Sider/index.vue'
import LayoutMultipleHeader from './components/Header/MultipleHeader.vue'
import LayoutContent from './components/Content/index.vue'
import { computed } from 'vue'
import { Layout } from 'ant-design-vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useHeaderSetting } from '@/hooks/settings/useHeaderSetting'
import createAsyncComponent from '@/utils/factory/createAsyncComponent'
const LayoutFeatrues = createAsyncComponent(() => import('./components/Feature/index.vue'))
const LayoutFooter = createAsyncComponent(() => import('./components/Footer/index.vue'))
const { prefixCls } = useDesign('default-layout')
const { getShowFullHeaderRef } = useHeaderSetting()
const layoutClass = computed((): string[] => {
  const cls: string[] = ['ant-layout']
  return cls
})
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-default-layout';

.@{prefix-cls} {
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: skyblue;
  flex-direction: column;
  > .layout {
    min-height: 100%;
  }
  &-main {
    width: 100%;
  }
}
</style>
