import { useLocation } from "react-router-dom"

export function Footer() {
  const location = useLocation()
  const isHome = location.pathname === "/"
  const anchor = (hash: string) => (isHome ? hash : `/${hash}`)

  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-6">
              <img src="https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/bucket/2c6689e0-a3ec-42e2-9346-c40fd6a581ed.png" alt="СпецПромАгрегат-Вент" loading="lazy" decoding="async" className="w-auto h-12" />
            </a>
            <p className="text-sm font-medium mb-2">ООО ПФ «СпецПромАгрегат-Вент»</p>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Производство воздуховодов из оцинкованной и нержавеющей стали. Полный цикл изготовления, собственный цех, доставка по России.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium mb-4">Разделы</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href={anchor("#projects")} className="hover:text-foreground transition-colors">
                  Проекты
                </a>
              </li>
              <li>
                <a href={anchor("#about")} className="hover:text-foreground transition-colors">
                  Производство
                </a>
              </li>
              <li>
                <a href={anchor("#services")} className="hover:text-foreground transition-colors">
                  Услуги
                </a>
              </li>
              <li>
                <a href={anchor("#contact")} className="hover:text-foreground transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium mb-4">Связь</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:specpromagregat-vent@yandex.ru" className="hover:text-foreground transition-colors">
                  specpromagregat-vent@yandex.ru
                </a>
              </li>
              <li>
                <a href="tel:+79274654464" className="hover:text-foreground transition-colors">
                  8-927-465-44-64
                </a>
              </li>
              <li className="leading-snug">
                РТ, г. Набережные Челны,<br />
                проезд Пролетарский, д. 5, офис 4
              </li>
              <li>
                <a
                  href="https://yandex.ru/maps/?text=Набережные+Челны+проезд+Пролетарский+5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Открыть на карте
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border text-sm text-muted-foreground">
          <p>© 2025 ООО ПФ «СпецПромАгрегат-Вент». Все права защищены. · 🛡️ Лицензия МЧС России</p>
        </div>
      </div>
    </footer>
  )
}