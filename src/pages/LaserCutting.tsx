import { useState } from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { HighlightedText } from "../components/HighlightedText"
import Icon from "@/components/ui/icon"

const SEND_URL = "https://functions.poehali.dev/a30293a9-d214-4e7b-ae44-ddcfc031adff"

const advantages = [
  {
    icon: "Zap",
    title: "Высокая точность",
    description: "Лазерный раскрой металла с точностью до 0,1 мм — идеальная геометрия деталей любой сложности.",
  },
  {
    icon: "Layers",
    title: "Толщина от 0,5 до 20 мм",
    description: "Режем чёрный металл, оцинкованную и нержавеющую сталь широкого диапазона толщин.",
  },
  {
    icon: "FileText",
    title: "Работа по чертежам",
    description: "Принимаем файлы DWG, DXF, PDF. Раскроим деталь точно по вашей спецификации.",
  },
  {
    icon: "Clock",
    title: "Быстрое изготовление",
    description: "Стандартные заказы выполняем за 1–3 рабочих дня, крупные партии — по согласованному графику.",
  },
  {
    icon: "Ruler",
    title: "Любые формы и размеры",
    description: "Простые заготовки, сложные фигурные детали, перфорация, гравировка — под любые задачи.",
  },
  {
    icon: "Truck",
    title: "Доставка по России",
    description: "Отгружаем готовые изделия транспортными компаниями или самовывозом со склада в Набережных Челнах.",
  },
]

const materials = [
  { name: "Чёрная сталь", range: "0,5 – 20 мм" },
  { name: "Оцинкованная сталь", range: "0,5 – 3 мм" },
  { name: "Нержавеющая сталь", range: "0,5 – 12 мм" },
  { name: "Алюминий", range: "0,5 – 10 мм" },
]

const faqs = [
  {
    question: "Какие файлы нужны для расчёта заказа?",
    answer: "Достаточно прислать чертёж в формате DWG, DXF или PDF. Если чертежа нет — опишите деталь, и наши специалисты помогут подготовить макет.",
  },
  {
    question: "Какой минимальный объём заказа?",
    answer: "Принимаем заказы любого объёма — от одной детали до крупных серийных партий металлопроката.",
  },
  {
    question: "Можно ли заказать гравировку или перфорацию?",
    answer: "Да, лазерная резка позволяет наносить гравировку, делать перфорацию и вырезать отверстия любой сложности за одну операцию.",
  },
  {
    question: "Сколько времени занимает изготовление?",
    answer: "Стандартные заказы — 1–3 рабочих дня. Сроки крупных партий согласуем индивидуально при оформлении заказа.",
  },
]

export default function LaserCutting() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSend = async () => {
    if (!name.trim() || !phone.trim()) {
      setError("Заполните имя и телефон")
      return
    }
    setSending(true)
    setError("")
    try {
      await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          duct_type: "Лазерная резка металла",
          dimensions: description,
          area: "",
        }),
      })
      setSent(true)
    } catch {
      setError("Ошибка отправки. Позвоните нам: 8-927-465-44-64")
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/1f6977e1-411c-4e24-b066-2c36b929ae25.jpg"
            alt="Лазерная резка металла"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-orange-300 mb-4 drop-shadow-lg font-semibold">
            Лазерная резка металла на заказ
          </p>
          <h1
            className="text-5xl md:text-7xl font-medium text-balance text-white mb-6 tracking-tight leading-[0.95]"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)" }}
          >
            Точный раскрой металла
            <br />
            <span className="text-orange-200">по вашим чертежам</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Изготавливаем детали любой сложности из чёрной, оцинкованной и нержавеющей стали. Точность, скорость, доступные цены.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-4 text-sm tracking-wide transition-colors"
            >
              Рассчитать стоимость
            </a>
            <a
              href="tel:+79274654464"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 text-sm tracking-wide hover:bg-white/10 transition-colors"
            >
              <Icon name="Phone" size={16} />
              +7 (927) 465-44-64
            </a>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Почему мы</p>
            <h2 className="text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-6xl">
              <HighlightedText>Лазерная резка</HighlightedText> с гарантией качества
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
            {advantages.map((a) => (
              <div key={a.title} className="pl-8 border-l border-border">
                <Icon name={a.icon} size={36} className="mb-4 text-orange-500" />
                <h3 className="text-xl font-medium mb-3">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Материалы */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Материалы</p>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-balance">
              С какими металлами работаем
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {materials.map((m) => (
              <div key={m.name} className="bg-background border border-border p-6 text-center">
                <p className="font-medium text-lg mb-2">{m.name}</p>
                <p className="text-orange-500 font-semibold">{m.range}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
            <h2 className="text-5xl font-medium leading-[1.15] tracking-tight text-balance lg:text-6xl">
              Частые вопросы
            </h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-border py-6">
                <p className="text-lg font-medium mb-2">{faq.question}</p>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форма заказа */}
      <section id="order" className="py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Оформить заказ</p>
            <h2 className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-6 text-balance">
              Нужна лазерная резка?
              <br />
              Рассчитаем стоимость <HighlightedText>за день</HighlightedText>
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10">
              Оставьте заявку — свяжемся с вами и уточним детали заказа.
            </p>

            {sent ? (
              <div className="flex items-center justify-center gap-2 bg-white/10 rounded-xl py-6 px-4">
                <Icon name="CheckCircle" size={22} />
                <span className="font-medium">Заявка отправлена! Мы скоро с вами свяжемся.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-w-md mx-auto">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-orange-400"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Телефон"
                  className="bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-orange-400"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опишите деталь: материал, толщина, размеры (необязательно)"
                  rows={3}
                  className="bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-orange-400 resize-none"
                />
                {error && <p className="text-red-300 text-sm">{error}</p>}
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-lg transition-colors disabled:opacity-60"
                >
                  {sending ? "Отправляю..." : "Отправить заявку"}
                </button>
              </div>
            )}

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
                <span className="text-sm">Пн–Пт, 7:00–16:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
