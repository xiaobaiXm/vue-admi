export type EventType = string | symbol
// 事件处理程序可以接受可选的事件参数
// 并且不应该返回值
export type Handler<T = any> = (event?: T) => void
export type WildcardHandler = (type: EventType, event?: any) => void
// 一种类型的所有当前注册事件处理程序的数组
export type EventHandlerList = Array<Handler>
export type WildCardEventHandlerList = Array<WildcardHandler>
// 事件类型及其对应的事件处理程序的映射
export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>
export interface Emitter {
  all: EventHandlerMap
  on<T = any>(type: EventType, handler: Handler<T>): void
  on(type: '*', handler: WildcardHandler): void
  off<T = any>(type: EventType, handler: Handler<T>): void
  off(type: '*', handler: WildcardHandler): void
  emit<T = any>(type: EventType, event?: T): void
  emit(type: '*', event?: any): void
  clear(): void
}
export default function miit(all?: EventHandlerMap): Emitter {
  all = all || new Map()
  return {
    all,
    // 为给定类型注册一个事件处理程序
    on<T = any>(type: EventType, handler: Handler<T>): void {
      const handlers = all?.get(type)
      const added = handlers && handlers.push(handler)
      if (!added) all?.set(type, [handler])
    },
    // 删除给定类型的事件处理程序
    off<T = any>(type: EventType, handler: Handler<T>): void {
      const handlers = all?.get(type)
      if (handlers) handlers.splice(handlers.indexOf(handler) >>> 0, 1)
    },
    // 调用给定类型的所有处理程序
    emit<T = any>(type: EventType, event: T): void {
      ;((all?.get(type) || []) as EventHandlerList).slice().map((handler) => handler(event))
      ;((all?.get('*') || []) as WildCardEventHandlerList).slice().map((handler) => handler(type, event))
    },
    // 清空
    clear(): void {
      this.all.clear()
    }
  }
}
