<template>
  <div :class="['logo', 'enter-x', getAppLogoClass]" @click="goHome">
    <img src="../../..//assets/images/logo.png" />
    <div :class="['md:opacity-100', 'ml-4', getTitleClass]" v-if="showTitle">{{ title }}</div>
  </div>
</template>
<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'
import { useGlobalSetting } from '@/hooks/settings'
const props = defineProps({
  theme: { type: String, validator: (v: string) => ['light', 'dark'].includes(v) },
  showTitle: { type: Boolean, default: true },
  alwaysShowTitle: { type: Boolean }
})
const { title } = useGlobalSetting()
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
.@{prefix-cls} {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 4px;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;

  & img {
    width: 48px;
  }

  &.light &__title {
    color: @primary-color;
  }

  &.dark &__title {
    color: @white;
  }

  &__title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
    line-height: normal;
  }
}
</style>
