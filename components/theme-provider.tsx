"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = Exclude<Theme, "system">

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] =
    React.useState<ResolvedTheme>("light")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme")
    if (
      storedTheme === "light" ||
      storedTheme === "dark" ||
      storedTheme === "system"
    ) {
      setTheme(storedTheme)
    }
    setMounted(true)
  }, [])

  React.useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key === "theme") {
        setTheme(
          event.newValue === "light" || event.newValue === "dark"
            ? event.newValue
            : "system"
        )
      }
    }

    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  React.useEffect(() => {
    if (!mounted) {
      return
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const applyTheme = () => {
      const nextTheme =
        theme === "system" ? (mediaQuery.matches ? "dark" : "light") : theme

      setResolvedTheme(nextTheme)
      document.documentElement.classList.toggle("dark", nextTheme === "dark")
      document.documentElement.style.colorScheme = nextTheme
    }

    window.localStorage.setItem("theme", theme)
    applyTheme()

    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme)
      return () => mediaQuery.removeEventListener("change", applyTheme)
    }
  }, [mounted, theme])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.key.toLowerCase() !== "d" ||
        isTypingTarget(event.target)
      ) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [resolvedTheme])

  return <>{children}</>
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

export { ThemeProvider }
