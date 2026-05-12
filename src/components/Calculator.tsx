import { useState } from "react"
import { HighlightedText } from "./HighlightedText"

type DuctType = "rectangular" | "round"

export function Calculator() {
  const [ductType, setDuctType] = useState<DuctType>("rectangular")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [diameter, setDiameter] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const l = parseFloat(length)
    if (!l || l <= 0) return

    if (ductType === "rectangular") {
      const w = parseFloat(width)
      const h = parseFloat(height)
      if (!w || !h || w <= 0 || h <= 0) return
      const perimeter = 2 * (w + h) / 1000
      const area = perimeter * l
      setResult(Math.round(area * 100) / 100)
    } else {
      const d = parseFloat(diameter)
      if (!d || d <= 0) return
      const area = Math.PI * (d / 1000) * l
      setResult(Math.round(area * 100) / 100)
    }
  }

  const reset = () => {
    setLength("")
    setWidth("")
    setHeight("")
    setDiameter("")
    setResult(null)
  }

  return (
    <section id="calculator" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-12">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Онлайн-расчёт</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            <HighlightedText>Калькулятор</HighlightedText>
            <br />
            воздуховода
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Введите размеры и длину воздуховода — мы посчитаем площадь поверхности в м².
          </p>
        </div>

        <div className="max-w-2xl">
          {/* Тип воздуховода */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => { setDuctType("rectangular"); setResult(null) }}
              className={`flex-1 py-3 px-6 text-sm font-medium border transition-all duration-200 ${
                ductType === "rectangular"
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "bg-transparent text-foreground border-border hover:border-foreground"
              }`}
            >
              Прямоугольный
            </button>
            <button
              onClick={() => { setDuctType("round"); setResult(null) }}
              className={`flex-1 py-3 px-6 text-sm font-medium border transition-all duration-200 ${
                ductType === "round"
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "bg-transparent text-foreground border-border hover:border-foreground"
              }`}
            >
              Круглый
            </button>
          </div>

          {/* Поля ввода */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Длина воздуховода, м</label>
              <input
                type="number"
                min="0"
                placeholder="Например: 10"
                value={length}
                onChange={(e) => { setLength(e.target.value); setResult(null) }}
                className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            {ductType === "rectangular" ? (
              <>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Ширина, мм</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Например: 400"
                    value={width}
                    onChange={(e) => { setWidth(e.target.value); setResult(null) }}
                    className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Высота, мм</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Например: 200"
                    value={height}
                    onChange={(e) => { setHeight(e.target.value); setResult(null) }}
                    className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Диаметр, мм</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Например: 315"
                  value={diameter}
                  onChange={(e) => { setDiameter(e.target.value); setResult(null) }}
                  className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
            )}
          </div>

          {/* Кнопки */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={calculate}
              className="flex-1 bg-foreground text-primary-foreground py-4 px-8 text-sm font-medium hover:bg-foreground/90 transition-colors duration-200"
            >
              Рассчитать
            </button>
            <button
              onClick={reset}
              className="px-8 py-4 text-sm border border-border hover:border-foreground transition-colors duration-200"
            >
              Сбросить
            </button>
          </div>

          {/* Результат */}
          {result !== null && (
            <div className="border border-foreground/20 bg-foreground/5 p-6 animate-in fade-in duration-300">
              <p className="text-sm text-muted-foreground mb-1">Площадь поверхности воздуховода</p>
              <p className="text-4xl font-medium mb-3">{result} <span className="text-2xl">м²</span></p>
              <p className="text-sm text-muted-foreground">
                Для точного расчёта стоимости с учётом материала и фасонных частей —{" "}
                <a href="#contact" className="underline underline-offset-4 hover:text-foreground transition-colors">
                  свяжитесь с нами
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
