<template>
  <Form :model="formData" ref="loginFrom" class="login-from">
    <div class="bg">
      <div class="container-title">
        <h3 class="title">{{ t('system.login.signInFormTitle') }}</h3>
      </div>
      <FormItem prop="username" class="from-item">
        <a-input size="large" v-model:value="formData.username" :placeholder="t('system.login.username')">
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
      </FormItem>
      <FormItem name="password" class="from-item">
        <a-input-password size="large" v-model:value="formData.password" :placeholder="t('system.login.password')">
          <template #prefix>
            <lock-outlined />
          </template>
        </a-input-password>
      </FormItem>
      <Button type="primary" :loading="loading">{{ t('system.login.loginButton') }}</Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, Button } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@/hooks/web/useI18n'
type FormData = {
  username: string
  password: string
}
const { t } = useI18n()
const FormItem = Form.Item
const formData = reactive<FormData>({
  username: 'admin',
  password: '12345678'
})
const loading = ref(false)
</script>

<style lang="less" scoped>
.login-from {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;

  .bg {
    border-radius: 15px;
    padding: 50px 35px 10px;
    background-color: #fff;

    .container-title {
      .title {
        font-size: 26px;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .from-item {
      margin-bottom: 22px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    button {
      width: 100%;
      height: 40px;
      margin-bottom: 30px;
    }
  }
}
</style>
