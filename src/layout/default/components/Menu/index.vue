<script lang="tsx">
// import
import { AppLogo } from '@/components/Application'
import { useDesign } from '@/hooks/web/useDesign'
import { useMenuSetting } from '@/hooks/settings/useMenuSetting'
export default defineComponent({
  name: 'LayoutMenu',
  props: {
    // theme: propTypes.oneOf(['light', 'dark'])
  },
  setup(props) {
    const { getMenuMode } = useMenuSetting()
    const { prefixCls } = useDesign('layout-menu')
    const getComputedMenuTheme = computed(() => props.theme || unref(getMenuMode))
    function renderHandler() {
      return <AppLogo showTitle={false} />
    }
    return () => {
      return (
        <>
          {renderHandler()}
          <div class={unref(prefixCls)}>菜单</div>
        </>
      )
    }
  }
})
</script>

<style lang="less" scoped></style>
