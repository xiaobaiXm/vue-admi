function trim(string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
export function addClass(el: Element, cls: string) {
  if (!el) return
  const classes = (cls || '').split(' ')
  let curClass = el.className
  for (let i = 0, j = classes.length; i < j; i++) {
    const className = classes[i]
    if (!className) continue
    if (el.classList) {
      el.classList.add(className)
    } else if (!hasClass(el, className)) {
      curClass += '' + className
    }
    if (!el.classList) el.className = curClass
  }
}
export function hasClass(el: Element, cls: string) {
  if (!el && !cls) return
  if (cls.indexOf(' ') !== -1) throw new Error('class name不应该包含空格。')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}
export function removerClass(el: Element, cls: string) {
  if (!el && !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '
  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue
    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}
