import { useCallback, useEffect, useState } from "react"

type ThemeMode = "light" | "dark"
const STORAGE_KEY = "scm-buddy-theme"

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === "dark" ? "dark" : "light"
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = useCallback((mode: ThemeMode) => setThemeState(mode), [])

  return { theme, setTheme }
}
