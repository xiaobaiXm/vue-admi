<template>
  <div class="login-container sm:px-14 py-2">
    <div class="flex items-center absolute right-4 top-4">
      <AppDarkModeToggle class="enter-x mr-2" />
      <AppLocalePicker class="text-white enter-x xl:text-gray-600" :show-text="false" :reload="false" />
    </div>
    <div class="-enter-x">
      <AppLogo :alwaysShowTitle="true" :showTitle="true" />
    </div>
    <LoginForm />
  </div>
</template>
<script setup lang="ts">
import { AppLogo, AppLocalePicker, AppDarkModeToggle } from '@/components/Application'
import LoginForm from './components/LoginForm.vue'
</script>
<style lang="less" scoped>
@bg: #283443;
@dark-bg: #293146;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;
}
</style>
