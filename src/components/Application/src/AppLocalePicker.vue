<template>
  <Dropdown
    placement="bottom"
    :trigger="['hover']"
    :dropMenuList="localeList"
    :selectedKeys="selectedKeys"
    @menu-event="handleMenuEvent"
    overlayClassName="app-locale-picker-overlay"
  >
    <span class="cursor-pointer flex items-center">
      <Icon icon="ion:language" />
      <span v-if="showText" class="ml-0.5">{{ getLocaleText }}</span>
    </span>
  </Dropdown>
</template>
<script setup lang="ts">
import { Icon } from '@/components/Icon'
import type { LocaleType } from '/#/config'
import type { DropMenu } from '@/components/Dropdown'
import Dropdown from '@/components/Dropdown/src/Dropdown.vue'
import { localeList } from '@/settings/localeSetting'
import { useLocale } from '@/locales/useLocale'
type Props = {
  showText: boolean
  reload?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  showText: true
})
const selectedKeys = ref<string[]>([])
const { changeLocale, getLocale } = useLocale()
const getLocaleText = computed((): string | undefined => {
  const key = selectedKeys.value[0]
  if (!key) return
  return localeList.find((item) => item.event === key)?.text
})
watchEffect(() => {
  selectedKeys.value = [unref(getLocale)]
})
// 修改app语言 重新加载页面
const toggleLocale = async (lang: LocaleType | string): Promise<void> => {
  await changeLocale(lang as LocaleType)
  selectedKeys.value = [lang as string]
  props.reload && location.reload()
}
// 接收子组件传回的值
const handleMenuEvent = (menu: DropMenu) => {
  if (unref(getLocale) === menu.event) return
  toggleLocale(menu.event as string)
}
</script>

<style lang="less" scoped></style>
