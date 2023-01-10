import { useAppProviderContext } from '@/components/Application'

export function useDesign(scope: string) {
  const values = useAppProviderContext()
  console.log(values)
  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls
  }
}
