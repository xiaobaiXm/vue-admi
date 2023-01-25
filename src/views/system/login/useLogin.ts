import { Ref, unref, computed } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
type CreateRules = {
  required: boolean
  message: string
  trigger: string
}
export function useFromValid<T extends Object = any>(fromRef: Ref<any>): { validForm: () => Promise<T | undefined> } {
  async function validForm(): Promise<T | undefined> {
    const from = unref(fromRef)
    if (!from) return
    const data = await from.validate()
    return data as T
  }
  return { validForm }
}
export function useFromRules() {
  const { t } = useI18n()
  const getUsernameFromRules = computed((): Array<CreateRules> => createRules(t('system.login.usernamePlaceholder')))
  const getPasswordFromRules = computed((): Array<CreateRules> => createRules(t('system.login.passwordPlaceholder')))
  const getFromRules = computed((): { [k: string]: any | any[] } => {
    const usernameFormRules = unref(getUsernameFromRules)
    const passwordFormRules = unref(getPasswordFromRules)
    return {
      username: usernameFormRules,
      password: passwordFormRules
    }
  })
  return { getFromRules }
}
function createRules(message: string): Array<CreateRules> {
  return [
    {
      required: true,
      message,
      trigger: 'change'
    }
  ]
}
