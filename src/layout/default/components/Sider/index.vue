<template>
  <Drawer v-if="getIsMobile" placement="left" :class="[prefixCls]">
    <Sider />
  </Drawer>
  <MixSider v-else-if="getIsMixSidebar" />
  <Sider v-else />
</template>

<script setup lang="ts">
import Sider from './components/LayoutSider.vue'
import MixSider from './components/MixSider.vue'
import { Drawer } from 'ant-design-vue'
import { useMenuSetting } from '@/hooks/settings/useMenuSetting'
import { useDesign } from '@/hooks/web/useDesign'
import { useAppInject } from '@/hooks/web/useAppInject'
const { prefixCls } = useDesign('layout-sider-wrapper')
const { getIsMobile } = useAppInject()
const { setMenuSetting, getCollapsed, getMenuWidth, getIsMixSidebar } = useMenuSetting()
</script>

<style lang="less" scoped></style>
