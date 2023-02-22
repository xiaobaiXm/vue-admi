<template>
  <Header>头部</Header>
</template>

<script setup lang="ts">
import { Layout } from 'ant-design-vue'
import { useDesign } from '@/hooks/web/useDesign'
const Header = Layout.Header
defineProps<{
  fixed?: boolean
}>()
const { prefixCls } = useDesign('layout-header')
</script>

<style lang="less" scoped>
@import './index.less';
</style>
