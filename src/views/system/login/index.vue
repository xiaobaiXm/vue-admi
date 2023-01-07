<template>
  <div class="login-container">
    <div class="container-title">
      <h3 class="title">后台管理系统</h3>
    </div>
    <span class="svg-container"> </span>
    <span class="svg-container">
      <svg-icon icon-class="password" />
    </span>
    <span class="show-pwd"></span>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

type FromData = {
  username: string
  password: string
}

const fromData = reactive<FromData>({
  username: 'admin',
  password: '123456'
})
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

  .login-from {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .container-title {
      .title {
        font-size: 26px;
        color: #eee;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .el-from-item {
      margin-bottom: 22px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;

      .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
