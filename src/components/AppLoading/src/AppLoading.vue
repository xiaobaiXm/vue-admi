<template>
  <div class="app-loading">
    <div class="app-loading-warp">
      <img src="@/assets/logo.png" alt="Logo" class="app-loading-logo" />
      <Loading />
      <div class="app-loading-title"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loading } from '@/components/Loading'
</script>

<style lang="less" scoped>
.app-loading {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f4f7f9;
  .app-loading-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    transform: translate3d(-50%, -50%, 0);
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .app-loading-title {
    display: flex;
    margin-top: 30px;
    font-size: 30px;
    color: rgb(0 0 0 / 85%);
    justify-content: center;
    align-items: center;
  }

  .app-loading-logo {
    display: block;
    width: 90px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}
</style>
