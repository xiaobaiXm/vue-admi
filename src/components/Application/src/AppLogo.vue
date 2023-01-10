<template>
  <div :class="['logo', getAppLogoClass]" @click="goHome">
    <img src="@/assets/logo.png" alt="" />
    <div :class="['title', getTitleClass]">Xiaomi Shop Admin</div>
  </div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'
type Props = {
  theme: string | boolean | Function
  showTitle: boolean
  alwaysShowTitle?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  theme: (v: string) => ['light', 'dark'].includes(v),
  showTitle: true
})
const { prefixCls } = useDesign('app-logo')
const getAppLogoClass = computed(() => [prefixCls, props.theme])
const getTitleClass = computed(() => [
  `${prefixCls}__title`,
  {
    'xs:opacity-0': !props.alwaysShowTitle
  }
])
const goHome = (): void => {
  console.log('go home')
}
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-app-logo';
</style>
