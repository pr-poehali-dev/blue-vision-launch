import { useState } from "react"
import { HighlightedText } from "./HighlightedText"

const SEND_URL = "https://functions.poehali.dev/a30293a9-d214-4e7b-ae44-ddcfc031adff"

type Tab = "rect" | "round" | "elbow-rect" | "elbow-round" | "transition"
type FormStep = "calc" | "form" | "done"

interface Result {
  area: number
  label: string
  details: string
}

const tabs: { id: Tab; label: string }[] = [
  { id: "rect", label: "Прямоугольный" },
  { id: "round", label: "Круглый" },
  { id: "elbow-rect", label: "Отвод прямоуг." },
  { id: "elbow-round", label: "Отвод круглый" },
  { id: "transition", label: "Переход" },
]

function InputField({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm text-muted-foreground mb-2">{label}</label>
      <input
        type="number" min="0" placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
      />
    </div>
  )
}

export function Calculator() {
  const [tab, setTab] = useState<Tab>("rect")
  const [result, setResult] = useState<Result | null>(null)
  const [step, setStep] = useState<FormStep>("calc")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState("")

  const [rA, setRA] = useState(""); const [rB, setRB] = useState(""); const [rL, setRL] = useState("")
  const [cD, setCD] = useState(""); const [cL, setCL] = useState("")
  const [eRA, setERA] = useState(""); const [eRB, setERB] = useState(""); const [eRR, setERR] = useState(""); const [eRAngle, setERAngle] = useState("90")
  const [eCR, setECR] = useState(""); const [eCAngle, setECAngle] = useState("90")
  const [tA1, setTA1] = useState(""); const [tB1, setTB1] = useState(""); const [tA2, setTA2] = useState(""); const [tB2, setTB2] = useState(""); const [tL, setTL] = useState("100")

  const round2 = (n: number) => Math.round(n * 100) / 100

  const calculate = () => {
    let area = 0; let label = ""; let details = ""

    if (tab === "rect") {
      const a = parseFloat(rA), b = parseFloat(rB), l = parseFloat(rL)
      if (!a || !b || !l) return
      area = round2(2 * (a + b) / 1000 * l)
      label = "Прямоугольный воздуховод"
      details = `${a}×${b} мм, длина ${l} м`
    }
    if (tab === "round") {
      const d = parseFloat(cD), l = parseFloat(cL)
      if (!d || !l) return
      area = round2(Math.PI * d / 1000 * l)
      label = "Круглый воздуховод"
      details = `Ø${d} мм, длина ${l} м`
    }
    if (tab === "elbow-rect") {
      const a = parseFloat(eRA), b = parseFloat(eRB), r = parseFloat(eRR), angle = parseFloat(eRAngle)
      if (!a || !b || !r || !angle) return
      const arcLen = r / 1000 * (angle * Math.PI / 180)
      area = round2(2 * (a + b) / 1000 * arcLen)
      label = "Отвод прямоугольного сечения"
      details = `${a}×${b} мм, R=${r} мм, угол ${angle}°`
    }
    if (tab === "elbow-round") {
      const d = parseFloat(eCR), angle = parseFloat(eCAngle)
      if (!d || !angle) return
      const r = d * 1.5
      area = round2(Math.PI * d / 1000 * (r / 1000 * (angle * Math.PI / 180)))
      label = "Отвод круглого сечения"
      details = `Ø${d} мм, угол ${angle}°`
    }
    if (tab === "transition") {
      const a1 = parseFloat(tA1), b1 = parseFloat(tB1), a2 = parseFloat(tA2), b2 = parseFloat(tB2), l = parseFloat(tL)
      if (!a1 || !b1 || !a2 || !b2 || !l) return
      const p1 = 2 * (a1 + b1) / 1000
      const p2 = 2 * (a2 + b2) / 1000
      area = round2((p1 + p2) / 2 * l / 1000)
      label = "Переход прямоугольный"
      details = `${a1}×${b1} → ${a2}×${b2} мм, длина ${l} мм`
    }

    setResult({ area, label, details })
    setStep("calc")
  }

  const reset = () => {
    setResult(null); setStep("calc")
    setRA(""); setRB(""); setRL("")
    setCD(""); setCL("")
    setERA(""); setERB(""); setERR(""); setERAngle("90")
    setECR(""); setECAngle("90")
    setTA1(""); setTB1(""); setTA2(""); setTB2(""); setTL("100")
    setName(""); setPhone(""); setFormError("")
  }

  const handleTabChange = (t: Tab) => { setTab(t); setResult(null); setStep("calc") }

  const sendRequest = async () => {
    if (!name.trim() || !phone.trim()) { setFormError("Заполните имя и телефон"); return }
    setSending(true); setFormError("")
    try {
      await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, duct_type: result?.label, dimensions: result?.details, area: result?.area }),
      })
      setStep("done")
    } catch {
      setFormError("Ошибка отправки. Позвоните нам: 8-927-465-44-64")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="calculator" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-12">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Онлайн-расчёт</p>
          <h2 className="text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            <HighlightedText>Калькулятор</HighlightedText>
            <br />
            воздуховода
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Выберите тип изделия, введите размеры — получите площадь поверхности в м².
          </p>
        </div>

        <div className="max-w-2xl">
          {/* Вкладки */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => handleTabChange(t.id)}
                className={`py-2 px-4 text-sm font-medium border transition-all duration-200 ${
                  tab === t.id
                    ? "bg-foreground text-primary-foreground border-foreground"
                    : "bg-transparent text-foreground border-border hover:border-foreground"
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Поля ввода */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {tab === "rect" && (<>
              <InputField label="Ширина A, мм" placeholder="400" value={rA} onChange={setRA} />
              <InputField label="Высота B, мм" placeholder="200" value={rB} onChange={setRB} />
              <InputField label="Длина, м" placeholder="10" value={rL} onChange={setRL} />
            </>)}
            {tab === "round" && (<>
              <InputField label="Диаметр D, мм" placeholder="315" value={cD} onChange={setCD} />
              <InputField label="Длина, м" placeholder="10" value={cL} onChange={setCL} />
            </>)}
            {tab === "elbow-rect" && (<>
              <InputField label="Ширина A, мм" placeholder="400" value={eRA} onChange={setERA} />
              <InputField label="Высота B, мм" placeholder="200" value={eRB} onChange={setERB} />
              <InputField label="Радиус R, мм" placeholder="200" value={eRR} onChange={setERR} />
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Угол, °</label>
                <select value={eRAngle} onChange={(e) => setERAngle(e.target.value)}
                  className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors">
                  {["15","30","45","60","90"].map(v => <option key={v} value={v}>{v}°</option>)}
                </select>
              </div>
            </>)}
            {tab === "elbow-round" && (<>
              <InputField label="Диаметр D, мм" placeholder="315" value={eCR} onChange={setECR} />
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Угол, °</label>
                <select value={eCAngle} onChange={(e) => setECAngle(e.target.value)}
                  className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors">
                  {["15","30","45","60","90"].map(v => <option key={v} value={v}>{v}°</option>)}
                </select>
              </div>
            </>)}
            {tab === "transition" && (<>
              <InputField label="Ширина A1, мм" placeholder="600" value={tA1} onChange={setTA1} />
              <InputField label="Высота B1, мм" placeholder="400" value={tB1} onChange={setTB1} />
              <InputField label="Ширина A2, мм" placeholder="400" value={tA2} onChange={setTA2} />
              <InputField label="Высота B2, мм" placeholder="200" value={tB2} onChange={setTB2} />
              <InputField label="Длина перехода, мм" placeholder="300" value={tL} onChange={setTL} />
            </>)}
          </div>

          {/* Кнопки */}
          <div className="flex gap-4 mb-8">
            <button onClick={calculate}
              className="flex-1 bg-foreground text-primary-foreground py-4 px-8 text-sm font-medium hover:bg-foreground/90 transition-colors duration-200">
              Рассчитать
            </button>
            <button onClick={reset}
              className="px-8 py-4 text-sm border border-border hover:border-foreground transition-colors duration-200">
              Сбросить
            </button>
          </div>

          {/* Результат */}
          {result && step === "calc" && (
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
          )}

          {/* Форма */}
          {step === "form" && result && (
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
          )}

          {/* Успех */}
          {step === "done" && (
            <div className="border border-foreground/20 bg-foreground/5 p-6">
              <p className="text-2xl font-medium mb-2">Заявка отправлена!</p>
              <p className="text-muted-foreground text-sm mb-4">
                Свяжемся с вами в ближайшее время и рассчитаем точную стоимость.
              </p>
              <button onClick={reset}
                className="text-sm underline underline-offset-4 hover:text-foreground/70 transition-colors">
                Сделать новый расчёт
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
