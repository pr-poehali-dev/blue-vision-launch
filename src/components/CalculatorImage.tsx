import { Tab, TAB_IMAGES, TAB_LABELS, TAB_BADGES, CAP_IMAGE_ROUND, CAP_IMAGE_RECT } from "./calculator-types"

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
      <path d="M30,20 L30,100 Q30,140 70,140 L170,140" stroke={stroke} />
      <path d="M50,20 L50,98 Q50,120 72,120 L170,120" stroke={stroke} />
      <line x1="30" y1="20" x2="50" y2="20" stroke={stroke} />
      <line x1="155" y1="140" x2="155" y2="120" stroke={stroke} />
      <line x1="30" y1="10" x2="30" y2="6" stroke={dim} strokeDasharray="3,2" />
      <line x1="50" y1="10" x2="50" y2="6" stroke={dim} strokeDasharray="3,2" />
      <text x="40" y="4" textAnchor="middle" fontSize="10" fill={dim} stroke="none">D</text>
      <path d="M 85,120 A 40,40 0 0 0 45,80" stroke={dim} fill="none" strokeDasharray="3,2"/>
      <text x="78" y="98" fontSize="10" fill={dim} stroke="none">R</text>
      <text x="100" y="155" textAnchor="middle" fontSize="9" fill={dim} stroke="none">Отвод круглого сечения</text>
    </svg>
  )

  if (tab === "transition-rr") return (
    <svg viewBox="0 0 220 120" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <rect x="10" y="20" width="60" height="80" stroke={stroke} />
      <rect x="150" y="35" width="50" height="50" stroke={stroke} strokeDasharray="4,3" />
      <line x1="70" y1="20" x2="150" y2="35" stroke={stroke} />
      <line x1="70" y1="100" x2="150" y2="85" stroke={stroke} />
      <line x1="10" y1="10" x2="10" y2="6" stroke={dim} strokeDasharray="3,2" />
      <line x1="70" y1="10" x2="70" y2="6" stroke={dim} strokeDasharray="3,2" />
      <text x="40" y="4" textAnchor="middle" fontSize="9" fill={dim} stroke="none">A1×B1</text>
      <line x1="150" y1="28" x2="150" y2="6" stroke={dim} strokeDasharray="3,2" />
      <text x="175" y="8" textAnchor="middle" fontSize="9" fill={dim} stroke="none">A2×B2</text>
      <line x1="70" y1="112" x2="150" y2="112" stroke={dim} />
      <text x="110" y="116" textAnchor="middle" fontSize="10" fill={dim} stroke="none">L</text>
      <text x="110" y="8" textAnchor="middle" fontSize="9" fill={dim} stroke="none">Прямоугольный → Прямоугольный</text>
    </svg>
  )

  if (tab === "transition-rc") return (
    <svg viewBox="0 0 220 120" className="w-full h-full" fill={fill} strokeWidth="1.5">
      <rect x="10" y="20" width="60" height="80" stroke={stroke} />
      <ellipse cx="185" cy="60" rx="15" ry="30" stroke={stroke} strokeDasharray="4,3" />
      <line x1="70" y1="20" x2="185" y2="30" stroke={stroke} />
      <line x1="70" y1="100" x2="185" y2="90" stroke={stroke} />
      <line x1="10" y1="10" x2="70" y2="10" stroke={dim} strokeDasharray="3,2" />
      <text x="40" y="8" textAnchor="middle" fontSize="9" fill={dim} stroke="none">A×B</text>
      <line x1="5" y1="20" x2="5" y2="52" stroke={dim} />
      <line x1="5" y1="68" x2="5" y2="100" stroke={dim} />
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

interface CalculatorImageProps {
  tab: Tab
  capShape: string
}

export function CalculatorImage({ tab, capShape }: CalculatorImageProps) {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-medium mb-4">{TAB_LABELS[tab]}</h3>
      <div className="border border-border bg-background overflow-hidden relative">
        <img
          key={tab + capShape}
          src={tab === "cap" ? (capShape === "round" ? CAP_IMAGE_ROUND : CAP_IMAGE_RECT) : TAB_IMAGES[tab]}
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
  )
}
