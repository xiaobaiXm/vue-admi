export interface MenuState {
  // 默认选中的列表
  defaulrSelectedKeys: string[]
  // 缩进
  inlineIndent?: number
  // 展开
  openKeys: string[]
  // 当前选中的菜单项
  selectedKeys: string[]
  // 收缩状态展开选项
  collapsedOpenKeys: string[]
}
