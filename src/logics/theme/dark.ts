import { darkCssIsReady, loadDarkThemeCss } from 'vite-plugin-theme/es/client'
import { addClass, hasClass, removerClass } from '@/utils/dom'
export async function updateThemeMode(mode: string | null = 'linth') {
  const htmlRoot = document.getElementById('htmlRoot')
  if (!htmlRoot) return
  const hasDarkClass = hasClass(htmlRoot, 'dark')
  if (mode === 'dark') {
    if (import.meta.env.PROD && !darkCssIsReady) {
      await loadDarkThemeCss()
    }
    htmlRoot.setAttribute('data-theme', 'dark')
    if (!hasDarkClass) {
      addClass(htmlRoot, 'dark')
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light')
    if (hasDarkClass) {
      removerClass(htmlRoot, 'dark')
    }
  }
}
