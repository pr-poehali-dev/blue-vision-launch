import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Лицензия МЧС",
    description:
      "Наше предприятие имеет лицензию МЧС России. Работаем в соответствии со всеми требованиями пожарной безопасности — вы получаете изделия, которые можно применять на объектах любой категории.",
  },
  {
    title: "Собственное производство",
    description:
      "Полный цикл изготовления: от раскроя листа до готового изделия. Никаких посредников — только наш цех, наш контроль качества.",
  },
  {
    title: "Точность до миллиметра",
    description:
      "Современное оборудование обеспечивает геометрическую точность воздуховодов и фасонных частей любой сложности. Фланцевые соединения без зазоров.",
  },
  {
    title: "Сталь для любых задач",
    description:
      "Работаем с оцинкованной сталью для стандартных вентиляционных систем и нержавеющей сталью для пищевых производств, медицины и агрессивных сред.",
  },
  {
    title: "Сроки без компромиссов",
    description: "Производим в срок даже при высокой загрузке. Складская программа обеспечивает быструю отгрузку стандартных позиций.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">О нашем производстве</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Металл с
              <br />
              <HighlightedText>точностью</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="/images/exterior.png"
                alt="Архитектурный эскиз рабочего пространства"
                className="opacity-90 relative z-10 w-auto"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Производство воздуховодов — это точность, материал и опыт. Мы делаем вентиляционные системы, которые работают десятилетиями без замены и обслуживания.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}