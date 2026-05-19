import { useState } from "react"
import { HighlightedText } from "./HighlightedText"

const SEND_URL = "https://functions.poehali.dev/a30293a9-d214-4e7b-ae44-ddcfc031adff"

type Tab =
  | "rect" | "round"
  | "elbow-rect" | "elbow-round"
  | "transition-rr" | "transition-rc" | "transition-cc"
  | "tee" | "cap" | "hood"

type FormStep = "calc" | "form" | "done"

interface Result {
  area: number
  label: string
  details: string
}

const TAB_IMAGES: Record<Tab, string> = {
  "rect": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/66b0c3b2-221e-45f8-a45e-8707afd5fac7.jpg",
  "round": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/8c22b3b5-ff6c-43f4-815c-2d8deacf2b3f.jpg",
  "elbow-rect": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/a522dbf8-4ea4-4b49-afe9-378233547aae.jpg",
  "elbow-round": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/12d64ffb-2cb8-461e-b016-9e2bdbbbf5ae.jpg",
  "transition-rr": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/1780a4bc-2586-4d79-9490-ae5e42bf3043.jpg",
  "transition-rc": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/f9dc13cb-959c-4576-8a83-1a8cf812e3be.jpg",
  "transition-cc": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/69b3e006-d57d-4b8a-bbd7-874f3582501a.jpg",
  "tee": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/20814d51-a647-4971-af9a-42299a404660.jpg",
  "cap": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/82d44d1a-e07a-41ea-8c53-a0caee82f9d5.jpg",
  "hood": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/1949ba48-b522-4137-8998-c34a6e380a9b.jpg",
}

const TAB_LABELS: Record<Tab, string> = {
  "rect": "Прямоугольный воздуховод",
  "round": "Круглый воздуховод",
  "elbow-rect": "Отвод прямоугольный",
  "elbow-round": "Отвод круглый",
  "transition-rr": "Переход прямоуг. → прямоуг.",
  "transition-rc": "Переход прямоуг. → круглый",
  "transition-cc": "Переход круглый → круглый",
  "tee": "Тройник",
  "cap": "Заглушка",
  "hood": "Зонт вытяжной",
}

// Позиции подписей на картинке (в % от ширины/высоты)
const TAB_BADGES: Record<Tab, { label: string; x: number; y: number }[]> = {
  "rect":          [{ label: "A", x: 18, y: 50 }, { label: "B", x: 50, y: 82 }, { label: "L", x: 80, y: 30 }],
  "round":         [{ label: "D", x: 20, y: 50 }, { label: "L", x: 72, y: 25 }],
  "elbow-rect":    [{ label: "A", x: 22, y: 22 }, { label: "B", x: 75, y: 50 }, { label: "R", x: 42, y: 68 }],
  "elbow-round":   [{ label: "D", x: 22, y: 30 }, { label: "R", x: 45, y: 70 }],
  "transition-rr": [{ label: "A1×B1", x: 12, y: 50 }, { label: "A2×B2", x: 78, y: 50 }, { label: "L", x: 50, y: 82 }],
  "transition-rc": [{ label: "A×B", x: 12, y: 50 }, { label: "D", x: 82, y: 50 }, { label: "L", x: 50, y: 82 }],
  "transition-cc": [{ label: "D1", x: 14, y: 40 }, { label: "D2", x: 80, y: 45 }, { label: "L", x: 50, y: 82 }],
  "tee":           [{ label: "A×B", x: 50, y: 72 }, { label: "C×D", x: 72, y: 22 }],
  "cap":           [{ label: "A", x: 38, y: 22 }, { label: "B", x: 18, y: 52 }],
  "hood":          [{ label: "D", x: 50, y: 82 }, { label: "H", x: 18, y: 50 }],
}

const tabs: { id: Tab; label: string; group: string }[] = [
  { id: "rect", label: "Прямоугольный", group: "Воздуховоды" },
  { id: "round", label: "Круглый", group: "Воздуховоды" },
  { id: "elbow-rect", label: "Отвод прямоуг.", group: "Отводы" },
  { id: "elbow-round", label: "Отвод круглый", group: "Отводы" },
  { id: "transition-rr", label: "Пр. → Пр.", group: "Переходы" },
  { id: "transition-rc", label: "Пр. → Кр.", group: "Переходы" },
  { id: "transition-cc", label: "Кр. → Кр.", group: "Переходы" },
  { id: "tee", label: "Тройник", group: "Фасонные части" },
  { id: "cap", label: "Заглушка", group: "Фасонные части" },
  { id: "hood", label: "Зонт", group: "Фасонные части" },
]

const groups = ["Воздуховоды", "Отводы", "Переходы", "Фасонные части"]

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

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-sm text-muted-foreground mb-2">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors">
        {options.map(v => <option key={v} value={v}>{v}</option>)}
      </select>
    </div>
  )
}

 
function SchemaSVG({ tab }: { tab: Tab }) {
  const stroke = "currentColor"
  const dim = "#888"
  const fill = "none"

  if (tab === "rect") return (
    <svg viewBox="0 0 200 120" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <rect x="20" y="30" width="160" height="60" stroke={stroke} />
      <line x1="20" y1="20" x2="20" y2="10" stroke={dim} strokeDasharray="3,2" />
      <line x1="180" y1="20" x2="180" y2="10" stroke={dim} strokeDasharray="3,2" />
      <line x1="20" y1="14" x2="90" y2="14" stroke={dim} />
      <line x1="110" y1="14" x2="180" y2="14" stroke={dim} />
      <text x="100" y="12" textAnchor="middle" fontSize="10" fill={dim} stroke="none">L</text>
      <line x1="10" y1="30" x2="2" y2="30" stroke={dim} strokeDasharray="3,2" />
      <line x1="10" y1="90" x2="2" y2="90" stroke={dim} strokeDasharray="3,2" />
      <line x1="6" y1="30" x2="6" y2="52" stroke={dim} />
      <line x1="6" y1="68" x2="6" y2="90" stroke={dim} />
      <text x="6" y="62" textAnchor="middle" fontSize="10" fill={dim} stroke="none">B</text>
      <line x1="20" y1="104" x2="180" y2="104" stroke={dim} strokeDasharray="2,2" />
      <text x="100" y="115" textAnchor="middle" fontSize="9" fill={dim} stroke="none">A × B — сечение</text>
    </svg>
  )

  if (tab === "round") return (
    <svg viewBox="0 0 200 120" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <ellipse cx="30" cy="60" rx="12" ry="30" stroke={stroke} />
      <ellipse cx="170" cy="60" rx="12" ry="30" stroke={stroke} strokeDasharray="4,3" />
      <line x1="30" y1="30" x2="170" y2="30" stroke={stroke} />
      <line x1="30" y1="90" x2="170" y2="90" stroke={stroke} />
      <line x1="30" y1="14" x2="30" y2="10" stroke={dim} strokeDasharray="3,2" />
      <line x1="170" y1="14" x2="170" y2="10" stroke={dim} strokeDasharray="3,2" />
      <line x1="30" y1="12" x2="90" y2="12" stroke={dim} />
      <line x1="110" y1="12" x2="170" y2="12" stroke={dim} />
      <text x="100" y="10" textAnchor="middle" fontSize="10" fill={dim} stroke="none">L</text>
      <line x1="30" y1="60" x2="42" y2="60" stroke={dim} strokeDasharray="3,2" />
      <text x="55" y="63" fontSize="10" fill={dim} stroke="none">D</text>
      <text x="100" y="112" textAnchor="middle" fontSize="9" fill={dim} stroke="none">Ø D — диаметр</text>
    </svg>
  )

  if (tab === "elbow-rect") return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <path d="M20,30 L20,100 Q20,130 50,130 L170,130" stroke={stroke} />
      <path d="M60,30 L60,95 Q60,90 65,90 L170,90" stroke={stroke} />
      <line x1="20" y1="20" x2="60" y2="20" stroke={dim} strokeDasharray="3,2" />
      <text x="40" y="16" textAnchor="middle" fontSize="10" fill={dim} stroke="none">A</text>
      <line x1="160" y1="130" x2="160" y2="145" stroke={dim} strokeDasharray="3,2" />
      <line x1="160" y1="90" x2="160" y2="75" stroke={dim} strokeDasharray="3,2" />
      <text x="175" y="112" fontSize="10" fill={dim} stroke="none">B</text>
      <path d="M 80,110 A 30,30 0 0 0 45,75" stroke={dim} fill="none" strokeDasharray="3,2"/>
      <text x="72" y="85" fontSize="10" fill={dim} stroke="none">R</text>
      <text x="100" y="155" textAnchor="middle" fontSize="9" fill={dim} stroke="none">Отвод прямоугольного сечения</text>
    </svg>
  )

  if (tab === "elbow-round") return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <path d="M30,20 L30,100 Q30,135 65,135 L175,135" stroke={stroke} />
      <path d="M50,20 L50,100 Q50,115 65,115 L175,115" stroke={stroke} />
      <ellipse cx="40" cy="20" rx="10" ry="5" stroke={stroke} strokeDasharray="4,3" />
      <ellipse cx="175" cy="125" rx="5" ry="10" stroke={stroke} strokeDasharray="4,3" />
      <line x1="30" y1="14" x2="50" y2="14" stroke={dim} />
      <text x="40" y="10" textAnchor="middle" fontSize="10" fill={dim} stroke="none">D</text>
      <path d="M 70,110 A 40,40 0 0 0 35,75" stroke={dim} fill="none" strokeDasharray="3,2"/>
      <text x="65" y="85" fontSize="10" fill={dim} stroke="none">R=1.5D</text>
      <text x="100" y="155" textAnchor="middle" fontSize="9" fill={dim} stroke="none">Отвод круглого сечения</text>
    </svg>
  )

  if (tab === "transition-rr") return (
    <svg viewBox="0 0 220 120" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <polygon points="20,20 20,100 180,85 180,35" stroke={stroke} />
      <line x1="20" y1="10" x2="20" y2="6" stroke={dim} strokeDasharray="3,2" />
      <line x1="20" y1="106" x2="20" y2="110" stroke={dim} strokeDasharray="3,2" />
      <line x1="5" y1="20" x2="5" y2="42" stroke={dim} />
      <line x1="5" y1="78" x2="5" y2="100" stroke={dim} />
      <text x="5" y="63" textAnchor="middle" fontSize="10" fill={dim} stroke="none">B1</text>
      <line x1="180" y1="28" x2="180" y2="48" stroke={dim} />
      <line x1="180" y1="72" x2="180" y2="88" stroke={dim} />
      <text x="198" y="63" textAnchor="middle" fontSize="10" fill={dim} stroke="none">B2</text>
      <line x1="20" y1="112" x2="90" y2="112" stroke={dim} />
      <line x1="110" y1="112" x2="180" y2="112" stroke={dim} />
      <text x="100" y="115" textAnchor="middle" fontSize="10" fill={dim} stroke="none">L</text>
      <text x="20" y="8" textAnchor="middle" fontSize="9" fill={dim} stroke="none">A1</text>
      <text x="180" y="28" textAnchor="middle" fontSize="9" fill={dim} stroke="none">A2</text>
    </svg>
  )

  if (tab === "transition-rc") return (
    <svg viewBox="0 0 220 120" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <line x1="20" y1="20" x2="180" y2="40" stroke={stroke} />
      <line x1="20" y1="100" x2="180" y2="80" stroke={stroke} />
      <line x1="20" y1="20" x2="20" y2="100" stroke={stroke} />
      <ellipse cx="180" cy="60" rx="8" ry="20" stroke={stroke} />
      <line x1="5" y1="20" x2="5" y2="42" stroke={dim} />
      <line x1="5" y1="78" x2="5" y2="100" stroke={dim} />
      <text x="5" y="63" textAnchor="middle" fontSize="10" fill={dim} stroke="none">B</text>
      <line x1="180" y1="40" x2="180" y2="52" stroke={dim} />
      <line x1="180" y1="68" x2="180" y2="80" stroke={dim} />
      <text x="200" y="63" textAnchor="middle" fontSize="10" fill={dim} stroke="none">D</text>
      <line x1="20" y1="112" x2="90" y2="112" stroke={dim} />
      <line x1="110" y1="112" x2="180" y2="112" stroke={dim} />
      <text x="100" y="116" textAnchor="middle" fontSize="10" fill={dim} stroke="none">L</text>
      <text x="100" y="8" textAnchor="middle" fontSize="9" fill={dim} stroke="none">Прямоугольный → Круглый</text>
    </svg>
  )

  if (tab === "transition-cc") return (
    <svg viewBox="0 0 220 120" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <ellipse cx="30" cy="60" rx="10" ry="30" stroke={stroke} />
      <ellipse cx="180" cy="60" rx="7" ry="20" stroke={stroke} strokeDasharray="4,3" />
      <line x1="30" y1="30" x2="180" y2="40" stroke={stroke} />
      <line x1="30" y1="90" x2="180" y2="80" stroke={stroke} />
      <line x1="30" y1="14" x2="30" y2="10" stroke={dim} strokeDasharray="3,2" />
      <text x="30" y="8" textAnchor="middle" fontSize="10" fill={dim} stroke="none">D1</text>
      <line x1="180" y1="34" x2="180" y2="10" stroke={dim} strokeDasharray="3,2" />
      <text x="190" y="8" textAnchor="start" fontSize="10" fill={dim} stroke="none">D2</text>
      <line x1="30" y1="108" x2="90" y2="108" stroke={dim} />
      <line x1="120" y1="108" x2="180" y2="108" stroke={dim} />
      <text x="105" y="116" textAnchor="middle" fontSize="10" fill={dim} stroke="none">L</text>
      <text x="105" y="4" textAnchor="middle" fontSize="9" fill={dim} stroke="none">Круглый → Круглый</text>
    </svg>
  )

  if (tab === "tee") return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <rect x="10" y="45" width="180" height="50" stroke={stroke} />
      <rect x="80" y="0" width="40" height="60" stroke={stroke} />
      <line x1="10" y1="35" x2="10" y2="30" stroke={dim} strokeDasharray="3,2" />
      <line x1="190" y1="35" x2="190" y2="30" stroke={dim} strokeDasharray="3,2" />
      <line x1="10" y1="32" x2="85" y2="32" stroke={dim} />
      <line x1="115" y1="32" x2="190" y2="32" stroke={dim} />
      <text x="100" y="29" textAnchor="middle" fontSize="10" fill={dim} stroke="none">A</text>
      <line x1="2" y1="45" x2="2" y2="60" stroke={dim} />
      <line x1="2" y1="75" x2="2" y2="95" stroke={dim} />
      <text x="2" y="72" textAnchor="middle" fontSize="10" fill={dim} stroke="none">B</text>
      <line x1="70" y1="0" x2="65" y2="0" stroke={dim} strokeDasharray="3,2" />
      <text x="55" y="30" fontSize="9" fill={dim} stroke="none">C×D</text>
      <text x="100" y="155" textAnchor="middle" fontSize="9" fill={dim} stroke="none">Тройник прямоугольный</text>
    </svg>
  )

  if (tab === "cap") return (
    <svg viewBox="0 0 200 120" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <rect x="20" y="30" width="120" height="60" stroke={stroke} />
      <rect x="140" y="30" width="30" height="60" stroke={stroke} fill="currentColor" fillOpacity="0.08" />
      <line x1="20" y1="20" x2="20" y2="15" stroke={dim} strokeDasharray="3,2" />
      <line x1="140" y1="20" x2="140" y2="15" stroke={dim} strokeDasharray="3,2" />
      <line x1="20" y1="17" x2="75" y2="17" stroke={dim} />
      <line x1="85" y1="17" x2="140" y2="17" stroke={dim} />
      <text x="80" y="14" textAnchor="middle" fontSize="10" fill={dim} stroke="none">A</text>
      <line x1="8" y1="30" x2="8" y2="52" stroke={dim} />
      <line x1="8" y1="68" x2="8" y2="90" stroke={dim} />
      <text x="8" y="63" textAnchor="middle" fontSize="10" fill={dim} stroke="none">B</text>
      <text x="100" y="112" textAnchor="middle" fontSize="9" fill={dim} stroke="none">Торцевая заглушка A × B</text>
    </svg>
  )

  if (tab === "hood") return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <rect x="70" y="80" width="60" height="60" stroke={stroke} />
      <polygon points="30,65 170,65 155,80 45,80" stroke={stroke} />
      <polygon points="10,40 190,40 170,65 30,65" stroke={stroke} />
      <line x1="10" y1="40" x2="190" y2="40" stroke={stroke} />
      <line x1="10" y1="30" x2="10" y2="26" stroke={dim} strokeDasharray="3,2" />
      <line x1="190" y1="30" x2="190" y2="26" stroke={dim} strokeDasharray="3,2" />
      <line x1="10" y1="28" x2="90" y2="28" stroke={dim} />
      <line x1="110" y1="28" x2="190" y2="28" stroke={dim} />
      <text x="100" y="25" textAnchor="middle" fontSize="10" fill={dim} stroke="none">D зонта</text>
      <line x1="63" y1="80" x2="55" y2="80" stroke={dim} strokeDasharray="3,2" />
      <line x1="63" y1="140" x2="55" y2="140" stroke={dim} strokeDasharray="3,2" />
      <line x1="58" y1="80" x2="58" y2="105" stroke={dim} />
      <line x1="58" y1="115" x2="58" y2="140" stroke={dim} />
      <text x="50" y="112" textAnchor="middle" fontSize="10" fill={dim} stroke="none">H</text>
      <text x="100" y="155" textAnchor="middle" fontSize="9" fill={dim} stroke="none">Вытяжной зонт</text>
    </svg>
  )

  return null
}

export function Calculator() {
  const [tab, setTab] = useState<Tab>("rect")
  const [result, setResult] = useState<Result | null>(null)
  const [step, setStep] = useState<FormStep>("calc")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState("")

  // Прямоугольный воздуховод
  const [rA, setRA] = useState(""); const [rB, setRB] = useState(""); const [rL, setRL] = useState("")
  // Круглый воздуховод
  const [cD, setCD] = useState(""); const [cL, setCL] = useState("")
  // Отвод прямоугольный
  const [eRA, setERA] = useState(""); const [eRB, setERB] = useState(""); const [eRR, setERR] = useState(""); const [eRAngle, setERAngle] = useState("90")
  // Отвод круглый
  const [eCR, setECR] = useState(""); const [eCAngle, setECAngle] = useState("90")
  // Переход прямоугольный → прямоугольный
  const [tRRA1, setTRRA1] = useState(""); const [tRRB1, setTRRB1] = useState(""); const [tRRA2, setTRRA2] = useState(""); const [tRRB2, setTRRB2] = useState(""); const [tRRL, setTRRL] = useState("300")
  // Переход прямоугольный → круглый
  const [tRCA, setTRCA] = useState(""); const [tRCB, setTRCB] = useState(""); const [tRCD, setTRCD] = useState(""); const [tRCL, setTRCL] = useState("300")
  // Переход круглый → круглый
  const [tCCD1, setTCCD1] = useState(""); const [tCCD2, setTCCD2] = useState(""); const [tCCL, setTCCL] = useState("300")
  // Тройник
  const [teeA, setTeeA] = useState(""); const [teeB, setTeeB] = useState(""); const [teeC, setTeeC] = useState(""); const [teeD, setTeeD] = useState("")
  // Заглушка
  const [capA, setCapA] = useState(""); const [capB, setCapB] = useState(""); const [capShape, setCapShape] = useState("rect")
  // Зонт
  const [hoodD, setHoodD] = useState(""); const [hoodH, setHoodH] = useState("200")
  // Количество
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
      details = `${a1}×${b1} → ${a2}×${b2} мм, длина ${l} мм`
    }
    if (tab === "transition-rc") {
      const a = parseFloat(tRCA), b = parseFloat(tRCB), d = parseFloat(tRCD), l = parseFloat(tRCL)
      if (!a || !b || !d || !l) return
      const pRect = 2 * (a + b) / 1000
      const pCirc = Math.PI * d / 1000
      area = round2((pRect + pCirc) / 2 * l / 1000)
      label = "Переход прямоугольный → круглый"
      details = `${a}×${b} → Ø${d} мм, длина ${l} мм`
    }
    if (tab === "transition-cc") {
      const d1 = parseFloat(tCCD1), d2 = parseFloat(tCCD2), l = parseFloat(tCCL)
      if (!d1 || !d2 || !l) return
      const p1 = Math.PI * d1 / 1000
      const p2 = Math.PI * d2 / 1000
      area = round2((p1 + p2) / 2 * l / 1000)
      label = "Переход круглый → круглый"
      details = `Ø${d1} → Ø${d2} мм, длина ${l} мм`
    }
    if (tab === "tee") {
      const a = parseFloat(teeA), b = parseFloat(teeB), c = parseFloat(teeC), d = parseFloat(teeD)
      if (!a || !b || !c || !d) return
      const mainPerim = 2 * (a + b) / 1000
      const branchPerim = 2 * (c + d) / 1000
      area = round2(mainPerim * (a / 1000) + branchPerim * (c / 1000))
      label = "Тройник прямоугольный"
      details = `Магистраль ${a}×${b} мм, ответвление ${c}×${d} мм`
    }
    if (tab === "cap") {
      if (capShape === "rect") {
        const a = parseFloat(capA), b = parseFloat(capB)
        if (!a || !b) return
        area = round2((a / 1000) * (b / 1000))
        label = "Заглушка прямоугольная"
        details = `${a}×${b} мм`
      } else {
        const d = parseFloat(capA)
        if (!d) return
        area = round2(Math.PI * (d / 1000) ** 2 / 4)
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

        {/* Группы вкладок */}
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
          {/* Левая колонка — картинка с подписями */}
          <div className="flex flex-col">
            <h3 className="text-xl font-medium mb-4">{TAB_LABELS[tab]}</h3>
            <div className="border border-border bg-background overflow-hidden relative">
              <img
                key={tab}
                src={TAB_IMAGES[tab]}
                alt={TAB_LABELS[tab]}
                className="w-full object-contain"
              />
              {TAB_BADGES[tab].map((badge) => (
                <div
                  key={badge.label}
                  className="absolute flex items-center justify-center"
                  style={{ left: `${badge.x}%`, top: `${badge.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <span className="bg-foreground text-primary-foreground text-xs font-bold px-2 py-0.5 rounded shadow-lg leading-tight">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Обозначения соответствуют полям ввода</p>
          </div>

          {/* Правая колонка — поля ввода */}
          <div>
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
                <SelectField label="Угол, °" value={eRAngle} onChange={setERAngle} options={["15","30","45","60","90"]} />
              </>)}
              {tab === "elbow-round" && (<>
                <InputField label="Диаметр D, мм" placeholder="315" value={eCR} onChange={setECR} />
                <SelectField label="Угол, °" value={eCAngle} onChange={setECAngle} options={["15","30","45","60","90"]} />
              </>)}
              {tab === "transition-rr" && (<>
                <InputField label="Ширина A1, мм" placeholder="600" value={tRRA1} onChange={setTRRA1} />
                <InputField label="Высота B1, мм" placeholder="400" value={tRRB1} onChange={setTRRB1} />
                <InputField label="Ширина A2, мм" placeholder="400" value={tRRA2} onChange={setTRRA2} />
                <InputField label="Высота B2, мм" placeholder="200" value={tRRB2} onChange={setTRRB2} />
                <InputField label="Длина перехода, мм" placeholder="300" value={tRRL} onChange={setTRRL} />
              </>)}
              {tab === "transition-rc" && (<>
                <InputField label="Ширина A, мм" placeholder="400" value={tRCA} onChange={setTRCA} />
                <InputField label="Высота B, мм" placeholder="300" value={tRCB} onChange={setTRCB} />
                <InputField label="Диаметр D, мм" placeholder="315" value={tRCD} onChange={setTRCD} />
                <InputField label="Длина перехода, мм" placeholder="300" value={tRCL} onChange={setTRCL} />
              </>)}
              {tab === "transition-cc" && (<>
                <InputField label="Диаметр D1, мм" placeholder="500" value={tCCD1} onChange={setTCCD1} />
                <InputField label="Диаметр D2, мм" placeholder="315" value={tCCD2} onChange={setTCCD2} />
                <InputField label="Длина перехода, мм" placeholder="300" value={tCCL} onChange={setTCCL} />
              </>)}
              {tab === "tee" && (<>
                <InputField label="Ширина магистрали A, мм" placeholder="600" value={teeA} onChange={setTeeA} />
                <InputField label="Высота магистрали B, мм" placeholder="400" value={teeB} onChange={setTeeB} />
                <InputField label="Ширина ответвления C, мм" placeholder="300" value={teeC} onChange={setTeeC} />
                <InputField label="Высота ответвления D, мм" placeholder="200" value={teeD} onChange={setTeeD} />
              </>)}
              {tab === "cap" && (<>
                <div className="sm:col-span-2">
                  <SelectField label="Форма сечения" value={capShape} onChange={setCapShape} options={["rect","round"]} />
                </div>
                {capShape === "rect" ? (<>
                  <InputField label="Ширина A, мм" placeholder="400" value={capA} onChange={setCapA} />
                  <InputField label="Высота B, мм" placeholder="200" value={capB} onChange={setCapB} />
                </>) : (
                  <InputField label="Диаметр D, мм" placeholder="315" value={capA} onChange={setCapA} />
                )}
              </>)}
              {tab === "hood" && (<>
                <InputField label="Диаметр воздуховода D, мм" placeholder="400" value={hoodD} onChange={setHoodD} />
                <InputField label="Высота зонта H, мм" placeholder="200" value={hoodH} onChange={setHoodH} />
              </>)}
            </div>

            {/* Количество */}
            <div className="mb-6">
              <InputField label="Количество, шт." placeholder="1" value={qty} onChange={setQty} />
            </div>

            {/* Кнопки */}
            <div className="flex gap-4 mb-6">
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
      </div>
    </section>
  )
}