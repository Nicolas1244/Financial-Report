import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'auto'

// Load initial theme from localStorage before React renders
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('theme') as Theme | null
  return stored || 'light'
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Apply theme to HTML element
  useEffect(() => {
    const html = document.documentElement
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    console.log('[useTheme] Applying theme:', theme, 'isDark:', isDark)
    console.log('[useTheme] HTML classes before:', html.className)
    
    if (isDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    
    console.log('[useTheme] HTML classes after:', html.className)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Listen for system theme changes if auto is enabled
  useEffect(() => {
    if (theme !== 'auto') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const html = document.documentElement
      if (mediaQuery.matches) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return { theme, setTheme }
}
