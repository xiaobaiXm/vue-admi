import { defineAsyncComponent } from 'vue'
import { Spin } from 'ant-design-vue'
import { noop } from '@/utils'
interface Options {
  size?: 'default' | 'small' | 'large'
  delay?: number
  timeout?: number
  loading?: boolean
  retry?: boolean
}
export default function createAsyncComponent(loader: Fn, options: Options = {}) {
  const { size = 'small', delay = 100, timeout = 30000, loading = false, retry = true } = options
  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? <Spin spinning={true} size={size} /> : undefined,
    timeout,
    delay,
    onError: !retry
      ? noop
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            //重试获取错误，3最大尝试次数
            retry()
          } else {
            //注意，重试/失败就像承诺的解决/拒绝:
            //必须调用其中一个来继续错误处理。
            fail()
          }
        }
  })
}
