import { useEffect } from "react"

interface PageMeta {
  title: string
  description: string
}

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const descTag = document.querySelector('meta[name="description"]')
    const prevDescription = descTag?.getAttribute("content") ?? ""
    if (descTag) descTag.setAttribute("content", description)

    return () => {
      document.title = prevTitle
      if (descTag) descTag.setAttribute("content", prevDescription)
    }
  }, [title, description])
}
