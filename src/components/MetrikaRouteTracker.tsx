import { useEffect } from "react"
import { useLocation } from "react-router-dom"

declare global {
  interface Window {
    ym?: (id: number, method: string, params?: string) => void
  }
}

const METRIKA_ID = 109675857

export function MetrikaRouteTracker() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.ym === "function") {
      window.ym(METRIKA_ID, "hit", location.pathname + location.search)
    }
  }, [location])

  return null
}
