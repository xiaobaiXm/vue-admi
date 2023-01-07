<template>
  <SvgIcon :size="size" :name="getSvgIcon" :spin="spin" v-if="isSvgIcon" />
  <span :style="getWarpStyle"></span>
</template>
<script setup lang="ts">
import { ref, watch, computed, CSSProperties, onMounted } from 'vue'
import SvgIcon from './SvgIcon.vue'
import { isString } from '@/utils/is'
interface Props {
  icon: string
  color: string
  size: string | number
  spin: boolean
  prefix: string
}
const props = withDefaults(defineProps<Props>(), { size: 16, prefix: '' })
const SVG_END_WITH_FLAG = '|svg'
const isSvgIcon = computed((): boolean => props.icon?.endsWith(SVG_END_WITH_FLAG))
const getSvgIcon = computed((): string => props.icon?.replace(SVG_END_WITH_FLAG, ''))
const getWarpStyle = computed((): CSSProperties => {
  const { size, color } = props
  let fs = size
  if (isString(size)) fs = parseInt(size, 10)
  return { fontSize: `${fs}px`, color: color, display: 'inline-flex' }
})
const update = async () => {}
onMounted(update)
</script>

<style lang="less" scoped></style>
