import { useAppProviderContext } from '@/components/Application'

interface UseDesign {
  prefixCls: string
  prefixVar: string
}

export function useDesign(scope: string): UseDesign {
  const values = useAppProviderContext()
  console.log(values)
  return {
    prefixCls: `1`,
    prefixVar: '1'
  }
}
