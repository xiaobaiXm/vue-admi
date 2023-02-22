<template>
  <div></div>
  <div :class="getClass">
    <LayoutHeader />
    <MultipleTabs />
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from './index.vue'
import MultipleTabs from '../tabs/index.vue'
import { useDesign } from '@/hooks/web/useDesign'
const { prefixCls } = useDesign('-layout-multiple-header')
const getClass = computed(() => [prefixCls])
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-layout-multiple-header';
.@{prefix-cls} {
  transition: width 0.2s;
  flex: 0 0 auto;
}
</style>
