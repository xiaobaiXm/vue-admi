<template>
  <Form :model="formData" :rules="getFromRules" ref="loginFrom" class="login-from enter-x">
    <div class="bg">
      <div class="container-title enter-x">
        <h2 class="title">{{ t('system.login.signInFormTitle') }}</h2>
      </div>
      <FormItem name="username" class="enter-x">
        <a-input size="large" v-model:value="formData.username" :placeholder="t('system.login.username')">
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
      </FormItem>
      <FormItem name="password" class="enter-x">
        <a-input-password size="large" v-model:value="formData.password" :placeholder="t('system.login.password')">
          <template #prefix>
            <lock-outlined />
          </template>
        </a-input-password>
      </FormItem>
      <FormItem class="enter-x">
        <Button class="enter-x" type="primary" block :disabled="disabled" :loading="loading" @click="loginHandler">{{
          t('system.login.loginButton')
        }}</Button>
      </FormItem>
    </div>
  </Form>
</template>
<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'
import { Form, Button } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useFromValid, useFromRules } from '../useLogin'
import { useMessage } from '@/hooks/web/useMessage'
import { prefixCls } from '@/settings/designSetting'
const userStore = useUserStore()
const { t } = useI18n()
const { getFromRules } = useFromRules()
const { notification, createErrorModal } = useMessage()
const FormItem = Form.Item
const loginFrom = ref<FormInstance>()
const { validForm } = useFromValid(loginFrom)
const loading = ref(false)
const disabled = ref(false)
const formData = reactive({
  username: 'admin',
  password: '12345678'
})
const loginHandler = async (): Promise<undefined> => {
  try {
    const data = await validForm()
    if (!data) return
    try {
      loading.value = true
      const { username, password } = data
      const userInfo = await userStore.login({ username, password, mode: 'none' })
      userInfo &&
        notification.success({
          message: t('system.login.loginSuccessTitle'),
          description: `${t('system.login.loginSuccessDesc')}: ${userInfo.real_name}`,
          duration: 3
        })
    } catch (error) {
      createErrorModal({
        title: t('system.api.errorTip'),
        content: (error as unknown as Error).message || t('system.api.networkExceptionMsg'),
        getContainer: () => document.querySelector(`.${prefixCls}`) || document.body
      })
    } finally {
      loading.value = false
    }
  } catch (error) {}
}
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

    button {
      height: 40px;
    }
  }
}
</style>
