<template>
  <a-dropdown :trigger="trigger" v-bind="$attrs">
    <span>
      <slot></slot>
    </span>
    <template #overlay>
      <a-menu :selectedKeys="selectedKeys">
        <template v-for="item in dropMenuList" :key="`${item.event}}`">
          <a-menu-item v-bind="getAttr(item.event)" :disabled="item.disabled" @click="handleClickMenu(item)">
            <a-popconfirm v-if="popconfirm && item.popConfirm" v-bind="getPopConfirmAttrs(item.popConfirm)">
              <template #icon v-if="false">
                <div></div>
              </template>
              <div>
                <span class="ml-2">{{ item.text }}</span>
              </div>
            </a-popconfirm>
            <template v-else>
              <div>
                <span class="ml-2">{{ item.text }}</span>
              </div>
            </template>
          </a-menu-item>
          <a-menu-divider v-if="item.divider" :key="`d-${item.event}`" />
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts">
import { Dropdown, Menu, Popconfirm } from 'ant-design-vue'
import { omit } from 'lodash-es'
import { DropMenu } from '..'
const props = defineProps({
  popconfirm: Boolean,
  trigger: {
    type: [Array] as PropType<('contextmenu' | 'click' | 'hover')[]>,
    default: () => {
      return ['contextmenu']
    }
  },
  dropMenuList: {
    type: Array as PropType<(DropMenu & Recordable)[]>,
    default: () => []
  },
  selectedKeys: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})
const emit = defineEmits(['menuEvent'])
const ADropdown = Dropdown
const AMenu = Menu
const AMenuItem = Menu.Item
const AMenuDivider = Menu.Divider
const APopconfirm = Popconfirm
const getPopConfirmAttrs = computed(() => {
  return (attrs) => {
    const originAttrs = omit(attrs, ['confirm', 'cancel', 'icon'])
    return originAttrs
  }
})
const handleClickMenu = (item: DropMenu) => {
  const { event } = item
  const menu = props.dropMenuList.find((item) => `${item.event}` === `${event}`)
  emit('menuEvent', menu)
  item.onClick?.()
}
const getAttr = (key: string | number) => ({ key })
</script>
