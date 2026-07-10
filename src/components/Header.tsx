import { useState, useEffect, MouseEvent } from "react"
import { useLocation } from "react-router-dom"
import { cn } from "../lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const anchor = (hash: string) => (isHome ? hash : `/${hash}`)

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500 my-0 py-0 rounded-none",
        scrolled || mobileMenuOpen
          ? "bg-primary backdrop-blur-md py-3 top-4 left-4 right-4 rounded-2xl"
          : "bg-black/40 backdrop-blur-sm py-3 top-0 left-0 right-0 border-b border-white/10",
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between md:px-[24]">
        <div className="flex items-center gap-3 shrink-0">
          <a href="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
            <div className="flex flex-col items-start gap-0.5">
              <img src="https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/bucket/2c6689e0-a3ec-42e2-9346-c40fd6a581ed.png" alt="СпецПромАгрегат-Вент" className="w-auto h-8 drop-shadow-[0_0_6px_rgba(255,255,255,0.9),0_0_12px_rgba(255,255,255,0.5)]" />
              <span className="text-white font-semibold text-xs leading-tight tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">СпецПромАгрегат-Вент</span>
            </div>
          </a>
          <span className="hidden xl:inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-400/40 text-orange-200 text-xs px-2.5 py-1 rounded-full">
            🛡️ Лицензия МЧС
          </span>
        </div>

        <ul className="hidden xl:flex items-center gap-0.5 text-sm">
          {[
            { label: "Главная", href: "#hero" },
            { label: "Производство", href: "#about" },
            { label: "Проекты", href: "#projects" },
            { label: "Продукция", href: "#services" },
            { label: "Кондиционеры", href: "#conditioners" },
            { label: "Вентооборудование", href: "#vent-equipment" },
            { label: "Комплектующие", href: "#vent-parts" },
            { label: "Калькулятор", href: "#calculator" },
            { label: "Вопросы", href: "#faq" },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={anchor(item.href)}
                className="block px-2 py-1.5 rounded text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 whitespace-nowrap font-medium tracking-wide"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={anchor("#contact")}
          className="hidden xl:inline-flex items-center gap-2 text-sm px-4 py-2 transition-all duration-300 bg-orange-500 hover:bg-orange-600 text-white font-medium shrink-0"
        >
          Связаться
        </a>

        <button
          className="xl:hidden z-50 transition-colors duration-300 text-white"
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </nav>

      <div
        className={cn(
          "xl:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-screen opacity-100 mt-4" : "max-h-0 opacity-0",
        )}
      >
        <div className="container mx-auto px-6">
          <ul className="flex flex-col gap-3 mb-6">
            {[
              { label: "Главная", href: "#hero" },
              { label: "Производство", href: "#about" },
              { label: "Проекты", href: "#projects" },
              { label: "Продукция", href: "#services" },
              { label: "Кондиционеры", href: "#conditioners" },
              { label: "Вентоборудование", href: "#vent-equipment" },
              { label: "Комплектующие", href: "#vent-parts" },
              { label: "Калькулятор", href: "#calculator" },
              { label: "Вопросы", href: "#faq" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={anchor(item.href)}
                  className="hover:text-[rgb(251,146,60)] transition-colors duration-300 text-white text-2xl font-light block"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={anchor("#contact")}
            className="inline-flex items-center justify-center gap-2 text-sm px-5 py-2.5 bg-white text-foreground border border-foreground/20 hover:bg-foreground hover:text-white transition-all duration-300 mb-6"
            onClick={closeMobileMenu}
          >
            Связаться
          </a>

          <div className="border-t border-white/20 pt-6 pb-8 flex flex-col gap-3">
            <a href="tel:+79274654464" className="flex items-center gap-3 text-white/80 hover:text-orange-400 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
              <span className="text-lg">+7 (927) 465-44-64</span>
            </a>
            <a href="mailto:specpromagregat-vent@yandex.ru" className="flex items-center gap-3 text-white/80 hover:text-orange-400 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span className="text-base">specpromagregat-vent@yandex.ru</span>
            </a>
            <p className="flex items-center gap-3 text-white/50">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span className="text-base">Пн–Пт, 7:00–16:00</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}