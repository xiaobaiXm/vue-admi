export const REDIRECT_NAME = 'Redirect'
export const PAGE_NOT_FOUND_NAME = 'PageNotFound'
export const PARENT_LAYOUT_NAME = 'ParentLayout'
export const EXCEPTION_COMPONENT = () => import('@/views/system/exception/index.vue')
export const LAYOUT = () => import('@/layout/default/index.vue')
export const getParentLayout = (_name: string): Function => {
  return () => {
    new Promise((resolve) => {
      resolve({
        name: _name || PARENT_LAYOUT_NAME
      })
    })
  }
}
