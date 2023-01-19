<template>
  <div :class="['logo', getAppLogoClass]" @click="goHome">
    <img src="@/assets/logo.png" />
    <div :class="['md:opacity-100', 'ml-2', getTitleClass]">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'
import { useGlobalSetting } from '@/hooks/settings'
type Props = {
  theme: string | boolean | Function
  showTitle: boolean
  alwaysShowTitle?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  theme: (v: string) => ['light', 'dark'].includes(v),
  showTitle: true
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
  display: flex;
  align-items: center;
  margin-top: 12px;
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
