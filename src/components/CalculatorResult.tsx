import { FormStep, Result, SEND_URL } from "./calculator-types"

interface CalculatorResultProps {
  step: FormStep
  result: Result | null
  name: string; setName: (v: string) => void
  phone: string; setPhone: (v: string) => void
  sending: boolean; setSending: (v: boolean) => void
  formError: string; setFormError: (v: string) => void
  setStep: (v: FormStep) => void
  onReset: () => void
}

export function CalculatorResult({
  step, result,
  name, setName,
  phone, setPhone,
  sending, setSending,
  formError, setFormError,
  setStep,
  onReset,
}: CalculatorResultProps) {
  const sendRequest = async () => {
    if (!name.trim() || !phone.trim()) { setFormError("Заполните имя и телефон"); return }
    setSending(true); setFormError("")
    try {
      await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, duct_type: result?.label, dimensions: result?.details, area: result?.area }),
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

  if (step === "calc" && result) return (
    <div className="border border-foreground/20 bg-foreground/5 p-6">
      <p className="text-sm text-muted-foreground mb-1">{result.label} · {result.details}</p>
      <p className="text-4xl font-medium mb-4">{result.area} <span className="text-2xl">м²</span></p>
      <p className="text-sm text-muted-foreground mb-4">
        Оставьте контакты — рассчитаем точную стоимость с учётом материала.
      </p>
      <button onClick={() => setStep("form")}
        className="bg-foreground text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors duration-200">
        Получить расчёт стоимости
      </button>
    </div>
  )

  if (step === "form" && result) return (
    <div className="border border-foreground/20 bg-foreground/5 p-6">
      <p className="text-sm text-muted-foreground mb-1">{result.label}</p>
      <p className="text-3xl font-medium mb-6">{result.area} <span className="text-xl">м²</span></p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Ваше имя</label>
          <input type="text" placeholder="Иван" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Телефон</label>
          <input type="tel" placeholder="8-900-000-00-00" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
        </div>
      </div>
      {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
      <div className="flex gap-4">
        <button onClick={sendRequest} disabled={sending}
          className="flex-1 bg-foreground text-primary-foreground py-3 px-6 text-sm font-medium hover:bg-foreground/90 transition-colors duration-200 disabled:opacity-50">
          {sending ? "Отправляем..." : "Отправить заявку"}
        </button>
        <button onClick={() => setStep("calc")}
          className="px-6 py-3 text-sm border border-border hover:border-foreground transition-colors duration-200">
          Назад
        </button>
      </div>
    </div>
  )

  if (step === "done") return (
    <div className="border border-foreground/20 bg-foreground/5 p-6">
      <p className="text-2xl font-medium mb-2">Заявка отправлена!</p>
      <p className="text-muted-foreground text-sm mb-4">
        Свяжемся с вами в ближайшее время и рассчитаем точную стоимость.
      </p>
      <button onClick={onReset}
        className="text-sm underline underline-offset-4 hover:text-foreground/70 transition-colors">
        Сделать новый расчёт
      </button>
    </div>
  )

  return null
}