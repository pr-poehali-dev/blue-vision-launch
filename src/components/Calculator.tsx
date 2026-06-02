import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import { Tab, FormStep, Result, tabs, groups, TAB_LABELS } from "./calculator-types"
import { CalculatorImage } from "./CalculatorImage"
import { CalculatorFields } from "./CalculatorFields"
import { CalculatorResult } from "./CalculatorResult"

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
  const [tRRA1, setTRRA1] = useState(""); const [tRRB1, setTRRB1] = useState(""); const [tRRA2, setTRRA2] = useState(""); const [tRRB2, setTRRB2] = useState(""); const [tRRL, setTRRL] = useState("300")
  const [tRCA, setTRCA] = useState(""); const [tRCB, setTRCB] = useState(""); const [tRCD, setTRCD] = useState(""); const [tRCL, setTRCL] = useState("300")
  const [tCCD1, setTCCD1] = useState(""); const [tCCD2, setTCCD2] = useState(""); const [tCCL, setTCCL] = useState("300")
  const [teeA, setTeeA] = useState(""); const [teeB, setTeeB] = useState(""); const [teeC, setTeeC] = useState(""); const [teeD, setTeeD] = useState("")
  const [capA, setCapA] = useState(""); const [capB, setCapB] = useState(""); const [capShape, setCapShape] = useState("rect")
  const [hoodD, setHoodD] = useState(""); const [hoodH, setHoodH] = useState("200")
  const [qty, setQty] = useState("1")

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
    if (tab === "transition-rr") {
      const a1 = parseFloat(tRRA1), b1 = parseFloat(tRRB1), a2 = parseFloat(tRRA2), b2 = parseFloat(tRRB2), l = parseFloat(tRRL)
      if (!a1 || !b1 || !a2 || !b2 || !l) return
      const p1 = 2 * (a1 + b1) / 1000
      const p2 = 2 * (a2 + b2) / 1000
      area = round2((p1 + p2) / 2 * l / 1000)
      label = "Переход прямоугольный → прямоугольный"
      details = `${a1}×${b1} → ${a2}×${b2} мм, L=${l} мм`
    }
    if (tab === "transition-rc") {
      const a = parseFloat(tRCA), b = parseFloat(tRCB), d = parseFloat(tRCD), l = parseFloat(tRCL)
      if (!a || !b || !d || !l) return
      const pRect = 2 * (a + b) / 1000
      const pCirc = Math.PI * d / 1000
      area = round2((pRect + pCirc) / 2 * l / 1000)
      label = "Переход прямоугольный → круглый"
      details = `${a}×${b} → Ø${d} мм, L=${l} мм`
    }
    if (tab === "transition-cc") {
      const d1 = parseFloat(tCCD1), d2 = parseFloat(tCCD2), l = parseFloat(tCCL)
      if (!d1 || !d2 || !l) return
      const r1 = d1 / 2 / 1000, r2 = d2 / 2 / 1000
      const slant = Math.sqrt((r1 - r2) ** 2 + (l / 1000) ** 2)
      area = round2(Math.PI * (r1 + r2) * slant)
      label = "Переход круглый → круглый"
      details = `Ø${d1} → Ø${d2} мм, L=${l} мм`
    }
    if (tab === "tee") {
      const a = parseFloat(teeA), b = parseFloat(teeB), c = parseFloat(teeC), d = parseFloat(teeD)
      if (!a || !b || !c || !d) return
      area = round2(2 * (a + b) / 1000 * (a / 1000) + 2 * (c + d) / 1000 * (b / 1000))
      label = "Тройник прямоугольный"
      details = `Магистраль ${a}×${b}, ответвление ${c}×${d} мм`
    }
    if (tab === "cap") {
      if (capShape === "rect") {
        const a = parseFloat(capA), b = parseFloat(capB)
        if (!a || !b) return
        area = round2(a * b / 1e6)
        label = "Заглушка прямоугольная"
        details = `${a}×${b} мм`
      } else {
        const d = parseFloat(capA)
        if (!d) return
        area = round2(Math.PI * (d / 2 / 1000) ** 2)
        label = "Заглушка круглая"
        details = `Ø${d} мм`
      }
    }
    if (tab === "hood") {
      const d = parseFloat(hoodD), h = parseFloat(hoodH)
      if (!d || !h) return
      const r = d / 2 / 1000
      const slantH = Math.sqrt(r * r + (h / 1000) * (h / 1000))
      area = round2(Math.PI * r * slantH)
      label = "Зонт вытяжной"
      details = `Ø${d} мм, высота ${h} мм`
    }

    if (area > 0) {
      const q = Math.max(1, parseInt(qty) || 1)
      setResult({ area: round2(area * q), label, details: q > 1 ? `${details}, ${q} шт.` : details })
      setStep("calc")
    }
  }

  const reset = () => {
    setResult(null); setStep("calc")
    setRA(""); setRB(""); setRL("")
    setCD(""); setCL("")
    setERA(""); setERB(""); setERR(""); setERAngle("90")
    setECR(""); setECAngle("90")
    setTRRA1(""); setTRRB1(""); setTRRA2(""); setTRRB2(""); setTRRL("300")
    setTRCA(""); setTRCB(""); setTRCD(""); setTRCL("300")
    setTCCD1(""); setTCCD2(""); setTCCL("300")
    setTeeA(""); setTeeB(""); setTeeC(""); setTeeD("")
    setCapA(""); setCapB(""); setCapShape("rect")
    setHoodD(""); setHoodH("200")
    setQty("1")
    setName(""); setPhone(""); setFormError("")
  }

  const handleTabChange = (t: Tab) => { setTab(t); setResult(null); setStep("calc") }

  return (
    <section id="calculator" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-10">
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

        <div className="flex flex-wrap gap-6 mb-8">
          {groups.map((group) => (
            <div key={group}>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{group}</p>
              <div className="flex flex-wrap gap-2">
                {tabs.filter(t => t.group === group).map((t) => (
                  <button key={t.id} onClick={() => handleTabChange(t.id)}
                    className={`py-1.5 px-3 text-sm font-medium border transition-all duration-200 ${
                      tab === t.id
                        ? "bg-foreground text-primary-foreground border-foreground"
                        : "bg-transparent text-foreground border-border hover:border-foreground"
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <CalculatorImage tab={tab} capShape={capShape} />

          <div>
            <CalculatorFields
              tab={tab}
              rA={rA} setRA={setRA} rB={rB} setRB={setRB} rL={rL} setRL={setRL}
              cD={cD} setCD={setCD} cL={cL} setCL={setCL}
              eRA={eRA} setERA={setERA} eRB={eRB} setERB={setERB} eRR={eRR} setERR={setERR} eRAngle={eRAngle} setERAngle={setERAngle}
              eCR={eCR} setECR={setECR} eCAngle={eCAngle} setECAngle={setECAngle}
              tRRA1={tRRA1} setTRRA1={setTRRA1} tRRB1={tRRB1} setTRRB1={setTRRB1} tRRA2={tRRA2} setTRRA2={setTRRA2} tRRB2={tRRB2} setTRRB2={setTRRB2} tRRL={tRRL} setTRRL={setTRRL}
              tRCA={tRCA} setTRCA={setTRCA} tRCB={tRCB} setTRCB={setTRCB} tRCD={tRCD} setTRCD={setTRCD} tRCL={tRCL} setTRCL={setTRCL}
              tCCD1={tCCD1} setTCCD1={setTCCD1} tCCD2={tCCD2} setTCCD2={setTCCD2} tCCL={tCCL} setTCCL={setTCCL}
              teeA={teeA} setTeeA={setTeeA} teeB={teeB} setTeeB={setTeeB} teeC={teeC} setTeeC={setTeeC} teeD={teeD} setTeeD={setTeeD}
              capA={capA} setCapA={setCapA} capB={capB} setCapB={setCapB} capShape={capShape} setCapShape={setCapShape}
              hoodD={hoodD} setHoodD={setHoodD} hoodH={hoodH} setHoodH={setHoodH}
              qty={qty} setQty={setQty}
              onCalculate={calculate}
            />

            <div className="mt-6">
              <CalculatorResult
                step={step}
                result={result}
                name={name} setName={setName}
                phone={phone} setPhone={setPhone}
                sending={sending} setSending={setSending}
                formError={formError} setFormError={setFormError}
                setStep={setStep}
                onReset={reset}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
