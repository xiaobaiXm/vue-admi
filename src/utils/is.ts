export const is = (value: unknown, type: string): boolean => {
  return toString.call(value) === `[object ${type}]`
}
export const isString = (value: unknown): value is string => {
  return is(value, 'String')
}
export const isNumber = (value: unknown): value is number => {
  return is(value, 'Number')
}
export const isFunction = (value: unknown): value is Function => {
  return is(value, 'Function')
}
export function isRegExp(value: unknown): value is RegExp {
  return is(value, 'RegExp')
}
