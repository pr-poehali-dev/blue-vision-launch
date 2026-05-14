import { useState } from "react"
import { HighlightedText } from "./HighlightedText"

type Category = "all" | "residential" | "administrative" | "factory" | "mall"

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Все проекты" },
  { id: "residential", label: "Жилые дома" },
  { id: "administrative", label: "Административные здания" },
  { id: "factory", label: "Заводы" },
  { id: "mall", label: "Торговые центры" },
]

const projects = [
  { id: 1, title: "Жилой комплекс «Новый квартал»", category: "residential", location: "Москва", year: "2024" },
  { id: 2, title: "Многоквартирный дом, ул. Ленина", category: "residential", location: "Казань", year: "2023" },
  { id: 3, title: "ЖК «Светлый»", category: "residential", location: "Самара", year: "2022" },
  { id: 4, title: "Бизнес-центр класса А", category: "administrative", location: "Москва", year: "2024" },
  { id: 5, title: "Офисный комплекс «Горизонт»", category: "administrative", location: "Екатеринбург", year: "2023" },
  { id: 6, title: "Административное здание администрации", category: "administrative", location: "Уфа", year: "2022" },
  { id: 7, title: "Промышленная вентиляция завода", category: "factory", location: "Екатеринбург", year: "2024" },
  { id: 8, title: "Металлургический цех", category: "factory", location: "Челябинск", year: "2023" },
  { id: 9, title: "Фармацевтическое производство", category: "factory", location: "Владимир", year: "2022" },
  { id: 10, title: "Торговый центр «Галерея»", category: "mall", location: "Уфа", year: "2024" },
  { id: 11, title: "Торговый комплекс «Мегаполис»", category: "mall", location: "Новосибирск", year: "2023" },
  { id: 12, title: "Гипермаркет «Лента»", category: "mall", location: "Подмосковье", year: "2022" },
]

export function Projects() {
  const [activeTab, setActiveTab] = useState<Category>("all")

  const filtered = activeTab === "all" ? projects : projects.filter((p) => p.category === activeTab)

  return (
    <section id="projects" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-12">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Выполненные объекты</p>
          <h2 className="text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            <HighlightedText>Наши</HighlightedText>
            <br />
            проекты
          </h2>
        </div>

        {/* Вкладки */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActiveTab(c.id)}
              className={`py-2 px-4 text-sm font-medium border transition-all duration-200 ${
                activeTab === c.id
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "bg-transparent text-foreground border-border hover:border-foreground"
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Список */}
        <div className="border-t border-border">
          {filtered.map((project, index) => (
            <div key={project.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-5 border-b border-border group hover:bg-secondary/50 transition-colors px-2 -mx-2">
              <div className="flex items-baseline gap-4">
                <span className="text-muted-foreground/40 text-sm w-6 shrink-0">{String(index + 1).padStart(2, "0")}</span>
                <p className="font-medium text-base">{project.title}</p>
              </div>
              <div className="flex items-center gap-6 sm:gap-10 pl-10 sm:pl-0 text-sm text-muted-foreground shrink-0">
                <span>{project.location}</span>
                <span className="text-muted-foreground/50">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}