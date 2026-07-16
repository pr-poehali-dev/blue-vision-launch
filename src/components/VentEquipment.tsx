import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"
import { SEND_URL } from "./calculator-types"
import { isValidPhone } from "@/lib/validatePhone"

const equipment = [
  {
    name: "Вентиляторы канальные",
    description: "Для встройки в прямоугольные и круглые воздуховоды. Приточные и вытяжные, различной производительности.",
    icon: "Wind",
  },
  {
    name: "Вентиляторы осевые",
    description: "Настенные и потолочные осевые вентиляторы для общеобменной вентиляции жилых и производственных помещений.",
    icon: "RefreshCw",
  },
  {
    name: "Клапаны воздушные",
    description: "Обратные, регулирующие и противопожарные клапаны для управления воздушными потоками в системах вентиляции.",
    icon: "SlidersHorizontal",
  },
  {
    name: "Дефлекторы",
    description: "Крышные дефлекторы и флюгарки для естественной вентиляции. Защищают от атмосферных осадков и усиливают тягу.",
    icon: "ArrowUpFromLine",
  },
  {
    name: "Решётки и диффузоры",
    description: "Приточные и вытяжные решётки, потолочные и щелевые диффузоры для равномерного распределения воздуха.",
    icon: "Grid3x3",
  },
  {
    name: "Фильтры",
    description: "Кассетные, карманные и панельные фильтры для очистки воздуха. Классы фильтрации G3–F9.",
    icon: "Filter",
  },
]

type Step = "idle" | "form" | "done"

export function VentEquipment() {
  const [step, setStep] = useState<Step>("idle")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [comment, setComment] = useState("")
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState("")

  const sendRequest = async () => {
    if (!name.trim() || !phone.trim()) { setFormError("Заполните имя и телефон"); return }
    if (!isValidPhone(phone)) { setFormError("Проверьте номер телефона"); return }
    setSending(true); setFormError("")
    try {
      await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          duct_type: "Вентиляционное оборудование",
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
    <section id="vent-equipment" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Поставка оборудования</p>
          <h2 className="text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            <HighlightedText>Вентоборудование</HighlightedText>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Поставляем вентиляционное оборудование ведущих производителей. Подберём под ваш объект, доставим и поможем с комплектацией.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 mb-12">
          {equipment.map((item) => (
            <div key={item.name} className="relative pl-6 border-l border-border">
              <Icon name={item.icon} size={28} className="mb-3 text-foreground" />
              <h3 className="text-lg font-medium mb-2">{item.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {step === "idle" && (
          <div className="border border-border p-6 max-w-xl">
            <p className="text-lg font-medium mb-1">Нужно вентоборудование?</p>
            <p className="text-muted-foreground text-sm mb-4">Оставьте заявку — подберём оборудование и рассчитаем стоимость под ваш объект.</p>
            <button
              onClick={() => setStep("form")}
              className="bg-foreground text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors duration-200"
            >
              Узнать цену
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
                placeholder="Например: канальный вентилятор для Ø200, производительность 500 м³/ч"
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
              Свяжемся с вами в ближайшее время и подберём оборудование под ваш объект.
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