<template>
  <div v-if="getMenuFixed && !getIsMobile" v-show="showClassSidebarRef" :style="getHiddenStyle"></div>
  <Sider :width="getMenuWidth" :class="getSideClass" v-show="showClassSidebarRef" ref="sideRef">
    <template #trigger="{ LayoutTrigger }" v-if="false">
      <component :is="LayoutTrigger" />
    </template>
    <LayoutMenu :theme="getMenuTheme" :menuMode="getMenuMode" :splitType="getSplitType" />
    <DragBar ref="dragBarRef" />
  </Sider>
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { Layout } from 'ant-design-vue'
import DragBar from './DragBar.vue'
import LayoutMenu from '../../Menu/index.vue'
import { useMenuSetting } from '@/hooks/settings/useMenuSetting'
import { useAppInject } from '@/hooks/web/useAppInject'
import { useDesign } from '@/hooks/web/useDesign'
import { MenuModeEnum, MenuSplitTypeEnum } from '@/enums/menuEnum'
const Sider = Layout.Sider
const { prefixCls } = useDesign('layout-sidebar')
const { getIsMobile } = useAppInject()
const { getMenuWidth, getRealWidth, getIsMixMode, getMenuFixed, getMenuTheme, getSplit, getMenuHidden } =
  useMenuSetting()
const sideRef = ref<Element | null>(null)
const dragBarRef = ref<Element | null>(null)
const getSideClass = computed((): (string | { [x: string]: boolean })[] => [
  prefixCls,
  {
    [`${prefixCls}--fixed`]: unref(getMenuFixed),
    [`${prefixCls}--mix`]: unref(getIsMixMode) && unref(getIsMobile)
  }
])
const getSplitType = computed(() => (unref(getSplit) ? MenuSplitTypeEnum.LEFT : MenuSplitTypeEnum.NONE))
const getMenuMode = computed(() => (unref(getSplit) ? MenuModeEnum.INLINE : null))
const showClassSidebarRef = computed((): boolean => (unref(getSplit) ? !unref(getMenuHidden) : true))
const getHiddenStyle = computed((): CSSProperties => {
  const width = `${unref(getRealWidth)}px`
  return {
    width,
    overflow: 'hidden',
    flex: `0 0 ${width}`,
    maxWidth: width,
    minWidth: width,
    transition: 'all .2s'
  }
})
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-layout-sidebar';
.@{prefix-cls} {
  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }
}
</style>
