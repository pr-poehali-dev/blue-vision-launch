import { useState } from "react"
import { HighlightedText } from "./HighlightedText"

type Category = "all" | "galvanized" | "stainless" | "industrial"

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Все проекты" },
  { id: "galvanized", label: "Оцинкованная сталь" },
  { id: "stainless", label: "Нержавеющая сталь" },
  { id: "industrial", label: "Промышленные объекты" },
]

const projects = [
  { id: 1, title: "Вентиляция торгового центра", category: "galvanized", location: "Москва", year: "2024", area: "12 000 м²", volume: "320 пм воздуховодов" },
  { id: 2, title: "Система вытяжки пищевого цеха", category: "stainless", location: "Подмосковье", year: "2024", area: "4 500 м²", volume: "Класс B, жировые фильтры" },
  { id: 3, title: "Промышленная вентиляция завода", category: "industrial", location: "Екатеринбург", year: "2023", area: "38 000 м²", volume: "Фасонные части 1 800 шт." },
  { id: 4, title: "Медицинский центр — чистые зоны", category: "stainless", location: "Санкт-Петербург", year: "2023", area: "2 200 м²", volume: "ISO 7, герметичные фланцы" },
  { id: 5, title: "Склад логистического комплекса", category: "galvanized", location: "Новосибирск", year: "2023", area: "8 700 м²", volume: "210 пм воздуховодов" },
  { id: 6, title: "Котельная и технические помещения", category: "industrial", location: "Казань", year: "2022", area: "1 800 м²", volume: "Жаропрочная сталь 2 мм" },
  { id: 7, title: "Бизнес-центр класса А", category: "galvanized", location: "Москва", year: "2022", area: "22 000 м²", volume: "560 пм воздуховодов" },
  { id: 8, title: "Фармацевтическое производство", category: "stainless", location: "Владимир", year: "2021", area: "3 100 м²", volume: "GMP, класс чистоты A/B" },
  { id: 9, title: "Металлургический цех", category: "industrial", location: "Челябинск", year: "2021", area: "14 000 м²", volume: "Вытяжные зонты, рукавные фильтры" },
  { id: 10, title: "Торговый комплекс «Галерея»", category: "galvanized", location: "Уфа", year: "2020", area: "9 300 м²", volume: "280 пм воздуховодов" },
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
                <div>
                  <p className="font-medium text-base">{project.title}</p>
                  <p className="text-muted-foreground text-sm mt-0.5">{project.volume}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 sm:gap-10 pl-10 sm:pl-0 text-sm text-muted-foreground shrink-0">
                <span>{project.area}</span>
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
