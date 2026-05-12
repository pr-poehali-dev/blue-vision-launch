import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const expertiseAreas = [
  {
    title: "Прямые воздуховоды",
    description: "Прямоугольные и круглые воздуховоды из оцинкованной стали для общеобменной, приточной и вытяжной вентиляции любых объектов.",
    icon: "Wind",
  },
  {
    title: "Фасонные части",
    description:
      "Отводы, тройники, переходы, заглушки, врезки и другие фасонные элементы с точной геометрией — под стандарт или по индивидуальному чертежу.",
    icon: "Wrench",
  },
  {
    title: "Нержавеющая сталь",
    description:
      "Воздуховоды из нержавеющей стали для пищевой промышленности, медицины, фармацевтики и производств с агрессивными средами.",
    icon: "FlaskConical",
  },
  {
    title: "Промышленные системы",
    description:
      "Комплексное изготовление вентиляционных систем для заводов, складских комплексов и крупных промышленных объектов любой сложности.",
    icon: "Factory",
  },
  {
    title: "Поставка вентоборудования",
    description:
      "Поставляем вентиляционное оборудование и кондиционеры ведущих производителей. Подберём и доставим всё необходимое для комплектации вашего объекта.",
    icon: "AirVent",
  },
  {
    title: "Кондиционеры",
    description:
      "Поставка кондиционеров для жилых, коммерческих и промышленных объектов. Работаем с проверенными брендами, обеспечиваем гарантийное сопровождение.",
    icon: "Thermometer",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Что мы производим</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Продукция</HighlightedText>, проверенная
            <br />
            в деле
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Каждое изделие изготовлено на собственном оборудовании с соблюдением технических нормативов. Работаем с проектировщиками, монтажниками и заказчиками напрямую.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon name={area.icon} size={40} className="mb-4 text-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}