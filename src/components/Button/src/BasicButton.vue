<template>
  <Button :class="getButtonClass">
    <template #default="data">
      <slot v-bind="data || {}"></slot>
    </template>
  </Button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
export default defineComponent({ name: 'MyButton', extends: Button, inheritAttrs: false })
</script>
<script setup lang="ts">
import { computed } from 'vue'
import { buttonProps } from './props'
const props = defineProps(buttonProps)
const getButtonClass = computed((): [any] => {
  const { color, disabled } = props
  return [
    {
      [`ant-btn-${color}`]: !!color,
      [`is-disable`]: disabled
    }
  ]
})
</script>
