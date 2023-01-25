<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import 'dayjs/locale/zh-cn'
import { AppProvider } from '@/components/Application'
import { useLocale } from '@/locales/useLocale'
const { getAntdLocale } = useLocale()
</script>
