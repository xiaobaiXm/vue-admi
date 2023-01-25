<template>
  <svg :class="[prefixCls, $attrs.class, spin && 'svg-icon-spin']" :style="getStyle" aria-hidden="true">
    <use :xlink-href="symbolId" />
  </svg>
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
type Props = {
  prefix?: string
  name: string
  size: string | number
  spin?: boolean
}
const { prefixCls } = useDesign('svg-icon')
const props = withDefaults(defineProps<Props>(), { prefix: 'icon', size: 16, spin: false })
const symbolId = computed((): string => `#${props.prefix}-${props.name}`)
const getStyle = computed((): CSSProperties => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return { width: s, height: s }
})
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-svg-icon';

.@{prefix-cls} {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
