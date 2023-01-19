<template>
  <div class="login-container sm:px-14 py-2">
    <AppLogo :alwaysShowTitle="true" :showTitle="true" />
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { AppLogo } from '@/components/Application'
import LoginForm from './components/LoginForm.vue'
</script>

<style lang="less" scoped>
@bg: #283443;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;
}
</style>
