<template>
  <SvgIcon v-if="isSvgIcon" :size="size" :name="getSvgIcon" :spin="spin" :class="[$attrs.class, 'anticon']" />
  <span
    v-else
    ref="elRef"
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWarpStyle"
  ></span>
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import Iconify from '@purge-icons/generated'
import SvgIcon from './SvgIcon.vue'
import { isString } from '@/utils/is'
interface Props {
  icon: string
  color?: string
  size?: string | number
  spin?: boolean
  prefix?: string
}
const props = withDefaults(defineProps<Props>(), { size: 16, prefix: '' })
const elRef = ref<Element | null>(null)
const SVG_END_WITH_FLAG = '|svg'
const isSvgIcon = computed((): boolean => props.icon?.endsWith(SVG_END_WITH_FLAG))
const getSvgIcon = computed((): string => props.icon?.replace(SVG_END_WITH_FLAG, ''))
const getIconRef = computed((): string => `${props.prefix ? ':' : ''}${props.icon}`)
const getWarpStyle = computed((): CSSProperties => {
  const { size, color } = props
  let fs = size
  if (isString(size)) fs = parseInt(size, 10)
  return { fontSize: `${fs}px`, color: color, display: 'inline-flex' }
})
const update = async (): Promise<undefined> => {
  if (unref(isSvgIcon)) return
  const el = unref(elRef)
  if (!el) return
  await nextTick()
  const icon = unref(getIconRef)
  if (!icon) return
  const svg = Iconify.renderSVG(icon, {})
  if (svg) {
    el.textContent = ''
    el.appendChild(svg)
  } else {
    const span = document.createElement('span')
    span.className = 'iconify'
    span.dataset.icon = icon
    el.textContent = ''
    el.appendChild(span)
  }
}
onMounted(update)
</script>

<style lang="less" scoped>
.app-iconify {
  display: inline-block;

  &-spin {
    svg {
      animation: loadingCircle 1s infinite linear;
    }
  }
}

span.iconify {
  display: block;
  min-width: 1em;
  min-height: 1em;
  background-color: @iconify-bg-color;
  border-radius: 100%;
}
</style>
