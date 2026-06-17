import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"
import { SEND_URL } from "./calculator-types"

const models = [
  {
    area: "до 20 м²",
    power: "2.0 кВт",
    label: "Для небольших помещений",
    examples: "Кабинет, спальня, небольшой офис",
    icon: "Home",
  },
  {
    area: "до 35 м²",
    power: "3.5 кВт",
    label: "Для средних помещений",
    examples: "Гостиная, переговорная, торговый зал",
    icon: "Building2",
  },
  {
    area: "до 50 м²",
    power: "5.0 кВт",
    label: "Для больших помещений",
    examples: "Ресторан, магазин, просторный офис",
    icon: "Store",
  },
  {
    area: "от 50 м²",
    power: "от 7.0 кВт",
    label: "Промышленные решения",
    examples: "Склад, производственный цех, супермаркет",
    icon: "Factory",
  },
]

type Step = "idle" | "form" | "done"

export function AirConditioners() {
  const [selected, setSelected] = useState<number | null>(null)
  const [step, setStep] = useState<Step>("idle")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState("")

  const handleSelect = (index: number) => {
    setSelected(index)
    setStep("form")
    setFormError("")
  }

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
          duct_type: "Кондиционер",
          dimensions: selected !== null ? `${models[selected].power}, ${models[selected].area}` : "",
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

  const reset = () => {
    setSelected(null); setStep("idle")
    setName(""); setPhone(""); setFormError("")
  }

  return (
    <section id="conditioners" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Поставка оборудования</p>
          <h2 className="text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            <HighlightedText>Кондиционеры</HighlightedText>
            <br />
            и вентоборудование
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Подбираем и поставляем кондиционеры ведущих брендов для жилых, коммерческих и промышленных объектов. Выберите подходящую мощность — рассчитаем стоимость и подберём модель.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {models.map((model, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`text-left p-6 border transition-all duration-200 group ${
                selected === index
                  ? "border-foreground bg-foreground text-primary-foreground"
                  : "border-border bg-background hover:border-foreground"
              }`}
            >
              <Icon
                name={model.icon}
                size={32}
                className={`mb-4 ${selected === index ? "text-primary-foreground" : "text-foreground"}`}
              />
              <p className={`text-2xl font-medium mb-1 ${selected === index ? "text-primary-foreground" : ""}`}>
                {model.area}
              </p>
              <p className={`text-sm font-medium mb-3 ${selected === index ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {model.power}
              </p>
              <p className={`text-sm font-medium mb-1 ${selected === index ? "text-primary-foreground" : ""}`}>
                {model.label}
              </p>
              <p className={`text-xs leading-relaxed ${selected === index ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {model.examples}
              </p>
              <div className={`mt-4 text-sm font-medium underline underline-offset-4 ${selected === index ? "text-primary-foreground" : "text-foreground"}`}>
                Узнать цену →
              </div>
            </button>
          ))}
        </div>

        {step === "form" && selected !== null && (
          <div className="max-w-xl border border-foreground/20 bg-foreground/5 p-6">
            <p className="text-sm text-muted-foreground mb-1">
              {models[selected].label} · {models[selected].power} · {models[selected].area}
            </p>
            <p className="text-xl font-medium mb-6">Оставьте контакты — подберём модель и рассчитаем стоимость</p>
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
                onClick={reset}
                className="px-6 py-3 text-sm border border-border hover:border-foreground transition-colors duration-200"
              >
                Назад
              </button>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="max-w-xl border border-foreground/20 bg-foreground/5 p-6">
            <p className="text-2xl font-medium mb-2">Заявка отправлена!</p>
            <p className="text-muted-foreground text-sm mb-4">
              Свяжемся с вами в ближайшее время и подберём подходящую модель кондиционера.
            </p>
            <button
              onClick={reset}
              className="text-sm underline underline-offset-4 hover:text-foreground/70 transition-colors"
            >
              Выбрать другую мощность
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
