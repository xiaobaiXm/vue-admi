const projectName = import.meta.env.VITE_GLOBAL_APP_TITLE

export function warn(message: string): void {
  console.warn(`[${projectName} error]:${message}`)
}

export function error(message: string): void {
  throw new Error(`[${projectName} error]${message}:`)
}
