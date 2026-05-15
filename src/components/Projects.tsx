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
  { id: 1, title: "ЖК, ул. Менделеева", category: "residential", location: "Нижнекамск" },
  { id: 2, title: "Многоквартирный жилой дом, ул. Баки Урманче", category: "residential", location: "Нижнекамск" },
  { id: 3, title: "ЖК Кама, ул. Раскольникова", category: "residential", location: "Набережные Челны" },
  { id: 4, title: "ЖК Маяк, ул. Раскольникова", category: "residential", location: "Набережные Челны" },
  { id: 5, title: "ЖК Панорама, ул. Усманова", category: "residential", location: "Набережные Челны" },
  { id: 6, title: "ЖК Перспектива, Автозаводский район", category: "residential", location: "Набережные Челны" },
  { id: 7, title: "Жилой многоквартирный дом Зяб14/01, блок А, Б, В", category: "residential", location: "Набережные Челны" },
  { id: 8, title: "Детские сады", category: "administrative", location: "Набережные Челны, Нижнекамск, Мензелинск" },
  { id: 9, title: "Городская больница", category: "administrative", location: "Мензелинск" },
  { id: 10, title: "Государственная ветклиника", category: "administrative", location: "Мензелинск" },
  { id: 11, title: "Музыкальная школа", category: "administrative", location: "Мензелинск" },
  { id: 12, title: "Детская школа искусств", category: "administrative", location: "Мензелинск" },
  { id: 13, title: "Районный дворец культуры", category: "administrative", location: "Мензелинск" },
  { id: 14, title: "МБУ «РДК» Мензелинский муниципальный район", category: "administrative", location: "Мензелинск" },
  { id: 28, title: "Бетьки-Нефте-Центр", category: "administrative", location: "село Бетьки" },
  { id: 15, title: "Детская поликлиника №4", category: "administrative", location: "Набережные Челны" },
  { id: 16, title: "Ликёро-водочный завод", category: "factory", location: "Набережные Челны" },
  { id: 17, title: "Лазерное производство, пр. Вахитова", category: "factory", location: "Набережные Челны" },
  { id: 18, title: "Литейное производство, ул. Полиграфическая", category: "factory", location: "Набережные Челны" },
  { id: 19, title: "Фармацевтическое производство", category: "factory", location: "Набережные Челны" },
  { id: 20, title: "Сырный завод Нурлат", category: "factory", location: "Нурлат" },
  { id: 21, title: "Цех химических элементов", category: "factory", location: "Набережные Челны" },
  { id: 22, title: "Цех переработки мясных продуктов", category: "factory", location: "Набережные Челны" },
  { id: 23, title: "Ангары", category: "factory", location: "Чукотский автономный округ" },
  { id: 24, title: "ТЦ, ул. Химиков", category: "mall", location: "Нижнекамск" },
  { id: 25, title: "Клевер Спорт", category: "mall", location: "Набережные Челны" },
  { id: 26, title: "Сеть кафе Банзай", category: "mall", location: "Набережные Челны" },
  { id: 27, title: "Кафе-клуб Дарвин", category: "mall", location: "Набережные Челны" },
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}