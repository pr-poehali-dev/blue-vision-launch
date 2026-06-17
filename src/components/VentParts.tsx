import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"
import { SEND_URL } from "./calculator-types"

const parts = [
  { name: "Шина монтажная", description: "Перфорированная металлическая шина для крепления воздуховодов и оборудования", icon: "Minus" },
  { name: "Уголки", description: "Стальные уголки для монтажа и усиления конструкций вентиляционных систем", icon: "CornerRightDown" },
  { name: "Муфты", description: "Соединительные муфты для стыковки круглых воздуховодов", icon: "Link" },
  { name: "Ниппеля", description: "Ниппельные соединения для герметичного подключения элементов вентиляции", icon: "Plug" },
  { name: "Болты и шайбы", description: "Крепёжные элементы из оцинкованной стали для сборки вентиляционных систем", icon: "Wrench" },
  { name: "Траверсы", description: "Несущие конструкции для подвески и крепления воздуховодов к перекрытиям", icon: "AlignCenter" },
]

type Step = "idle" | "form" | "done"

export function VentParts() {
  const [step, setStep] = useState<Step>("idle")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [comment, setComment] = useState("")
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState("")

  const sendRequest = async () => {
    if (!name.trim() || !phone.trim()) { setFormError("Заполните имя и телефон"); return }
    setSending(true); setFormError("")
    try {
      await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          duct_type: "Комплектующие для вентиляции",
          dimensions: comment || "Не указано",
          area: "",
        }),
      })
      if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).ym) {
        (window as unknown as { ym: (id: number, action: string, goal: string) => void }).ym(109675857, "reachGoal", "send_request")
      }
      setStep("done")
    } catch {
      setFormError("Ошибка отправки. Позвоните нам: 8-927-465-44-64")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="vent-parts" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Комплектующие</p>
          <h2 className="text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Всё для монтажа
            <br />
            <HighlightedText>вентиляции</HighlightedText>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Поставляем ходовые комплектующие для монтажа вентиляционных систем. Шины, уголки, муфты, ниппеля, болты, шайбы, траверсы и многое другое — всё в одном месте.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border mb-12">
          {parts.map((part) => (
            <div key={part.name} className="bg-background p-8 group">
              <Icon name={part.icon} size={28} className="mb-4 text-foreground" />
              <h3 className="text-lg font-medium mb-2">{part.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{part.description}</p>
            </div>
          ))}
          <div className="bg-secondary/50 p-8 flex items-center justify-center">
            <p className="text-muted-foreground text-sm text-center leading-relaxed">
              И многое другое —<br />уточняйте наличие<br />по запросу
            </p>
          </div>
        </div>

        {step === "idle" && (
          <div className="border border-border p-6 max-w-xl">
            <p className="text-lg font-medium mb-1">Нужны комплектующие?</p>
            <p className="text-muted-foreground text-sm mb-4">Оставьте заявку — уточним наличие и стоимость под ваш объект.</p>
            <button
              onClick={() => setStep("form")}
              className="bg-foreground text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors duration-200"
            >
              Узнать цену и наличие
            </button>
          </div>
        )}

        {step === "form" && (
          <div className="border border-foreground/20 bg-foreground/5 p-6 max-w-xl">
            <p className="text-xl font-medium mb-6">Оставьте контакты — подберём и рассчитаем</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Иван"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Телефон</label>
                <input
                  type="tel"
                  placeholder="8-900-000-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-muted-foreground mb-2">Что нужно (необязательно)</label>
              <input
                type="text"
                placeholder="Например: шина монтажная 3м — 20 шт., муфты Ø200 — 10 шт."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
            <div className="flex gap-4">
              <button
                onClick={sendRequest}
                disabled={sending}
                className="flex-1 bg-foreground text-primary-foreground py-3 px-6 text-sm font-medium hover:bg-foreground/90 transition-colors duration-200 disabled:opacity-50"
              >
                {sending ? "Отправляем..." : "Отправить заявку"}
              </button>
              <button
                onClick={() => setStep("idle")}
                className="px-6 py-3 text-sm border border-border hover:border-foreground transition-colors duration-200"
              >
                Назад
              </button>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="border border-foreground/20 bg-foreground/5 p-6 max-w-xl">
            <p className="text-2xl font-medium mb-2">Заявка отправлена!</p>
            <p className="text-muted-foreground text-sm mb-4">
              Свяжемся с вами в ближайшее время и уточним наличие и стоимость.
            </p>
            <button
              onClick={() => { setStep("idle"); setName(""); setPhone(""); setComment("") }}
              className="text-sm underline underline-offset-4 hover:text-foreground/70 transition-colors"
            >
              Отправить ещё одну заявку
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
