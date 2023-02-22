<script lang="tsx">
import type { PropType } from 'vue'
import { AppLogo } from '@/components/Application'
import { useDesign } from '@/hooks/web/useDesign'
import { useMenuSetting } from '@/hooks/settings/useMenuSetting'
import { useAppInject } from '@/hooks/web/useAppInject'
import { MenuModeEnum, MenuSplitTypeEnum } from '@/enums/menuEnum'
export default defineComponent({
  name: 'LayoutMenu',
  props: {
    theme: { type: String, validator: (v: string) => ['light', 'dark'].includes(v) },
    isHorizontal: Boolean,
    splitType: {
      type: Number as PropType<MenuSplitTypeEnum>,
      default: MenuSplitTypeEnum.NONE
    },
    menuMode: {
      type: [String] as PropType<Nullable<MenuModeEnum>>
    }
  },
  setup(props) {
    const { getMenuMode, getCollapsed } = useMenuSetting()
    const { getIsMobile } = useAppInject()
    const { prefixCls } = useDesign('layout-menu')
    const getComputedMenuTheme = computed((): string => props.theme || unref(getMenuMode))
    const getLogoClass = computed((): (string | { [x: string]: boolean })[] => [
      `${prefixCls}-logo`,
      unref(getComputedMenuTheme),
      {
        [`${prefixCls}--mobile`]: unref(getIsMobile)
      }
    ])
    const renderHandler = () => (
      <AppLogo
        fontSize={'13px'}
        showTitle={!unref(getCollapsed)}
        class={unref(getLogoClass)}
        theme={unref(getComputedMenuTheme)}
      />
    )
    const renderMenu = () => <div class={unref(prefixCls)}>菜单</div>
    return () => {
      return (
        <>
          {renderHandler()}
          {renderMenu()}
        </>
      )
    }
  }
})
</script>

<style lang="less" scoped></style>
