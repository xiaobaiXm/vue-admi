<template>
  <div class="login-container">
    <AppLogo :alwaysShowTitle="true" />
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { AppLogo } from '@/components/Application'
import LoginForm from './LoginForm.vue'
</script>

<style lang="less" scoped>
@bg: #283443;
@cursor: #fff;
@light_gray: #fff;
@dark_gray: #889aa4;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;
}
</style>
