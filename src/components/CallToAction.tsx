import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

export function CallToAction() {
  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Оформить заказ</p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Нужны воздуховоды?
            <br />
            Рассчитаем <HighlightedText>за день</HighlightedText>
          </h2>

          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Передайте спецификацию или чертежи — подготовим коммерческое предложение в течение одного рабочего дня. Работаем с проектировщиками, монтажниками и заказчиками.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:specpromagregat-vent@yandex.ru"
              className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 group"
            >
              Отправить запрос
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+79274654464"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              Позвонить нам
            </a>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 border-t border-primary-foreground/10 pt-10">
            <a href="tel:+79274654464" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <Icon name="Phone" size={16} />
              <span className="text-sm">+7 (927) 465-44-64</span>
            </a>
            <a href="mailto:specpromagregat-vent@yandex.ru" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <Icon name="Mail" size={16} />
              <span className="text-sm">specpromagregat-vent@yandex.ru</span>
            </a>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <Icon name="Clock" size={16} />
              <span className="text-sm">Пн–Пт, 7:00–16:00 (обед 11:30–12:30)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}