import { Tab } from "./calculator-types"

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

interface CalculatorFieldsProps {
  tab: Tab
  rA: string; setRA: (v: string) => void
  rB: string; setRB: (v: string) => void
  rL: string; setRL: (v: string) => void
  cD: string; setCD: (v: string) => void
  cL: string; setCL: (v: string) => void
  eRA: string; setERA: (v: string) => void
  eRB: string; setERB: (v: string) => void
  eRR: string; setERR: (v: string) => void
  eRAngle: string; setERAngle: (v: string) => void
  eCR: string; setECR: (v: string) => void
  eCAngle: string; setECAngle: (v: string) => void
  tRRA1: string; setTRRA1: (v: string) => void
  tRRB1: string; setTRRB1: (v: string) => void
  tRRA2: string; setTRRA2: (v: string) => void
  tRRB2: string; setTRRB2: (v: string) => void
  tRRL: string; setTRRL: (v: string) => void
  tRCA: string; setTRCA: (v: string) => void
  tRCB: string; setTRCB: (v: string) => void
  tRCD: string; setTRCD: (v: string) => void
  tRCL: string; setTRCL: (v: string) => void
  tCCD1: string; setTCCD1: (v: string) => void
  tCCD2: string; setTCCD2: (v: string) => void
  tCCL: string; setTCCL: (v: string) => void
  teeA: string; setTeeA: (v: string) => void
  teeB: string; setTeeB: (v: string) => void
  teeC: string; setTeeC: (v: string) => void
  teeD: string; setTeeD: (v: string) => void
  capA: string; setCapA: (v: string) => void
  capB: string; setCapB: (v: string) => void
  capShape: string; setCapShape: (v: string) => void
  hoodD: string; setHoodD: (v: string) => void
  hoodH: string; setHoodH: (v: string) => void
  qty: string; setQty: (v: string) => void
  onCalculate: () => void
}

export function CalculatorFields({
  tab,
  rA, setRA, rB, setRB, rL, setRL,
  cD, setCD, cL, setCL,
  eRA, setERA, eRB, setERB, eRR, setERR, eRAngle, setERAngle,
  eCR, setECR, eCAngle, setECAngle,
  tRRA1, setTRRA1, tRRB1, setTRRB1, tRRA2, setTRRA2, tRRB2, setTRRB2, tRRL, setTRRL,
  tRCA, setTRCA, tRCB, setTRCB, tRCD, setTRCD, tRCL, setTRCL,
  tCCD1, setTCCD1, tCCD2, setTCCD2, tCCL, setTCCL,
  teeA, setTeeA, teeB, setTeeB, teeC, setTeeC, teeD, setTeeD,
  capA, setCapA, capB, setCapB, capShape, setCapShape,
  hoodD, setHoodD, hoodH, setHoodH,
  qty, setQty,
  onCalculate,
}: CalculatorFieldsProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {tab === "rect" && (<>
          <InputField label="Ширина A, мм" placeholder="400" value={rA} onChange={setRA} />
          <InputField label="Высота B, мм" placeholder="200" value={rB} onChange={setRB} />
          <InputField label="Длина L, м" placeholder="10" value={rL} onChange={setRL} />
        </>)}
        {tab === "round" && (<>
          <InputField label="Диаметр D, мм" placeholder="315" value={cD} onChange={setCD} />
          <InputField label="Длина L, м" placeholder="10" value={cL} onChange={setCL} />
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
          <InputField label="Длина L, мм" placeholder="300" value={tRRL} onChange={setTRRL} />
        </>)}
        {tab === "transition-rc" && (<>
          <InputField label="Ширина A, мм" placeholder="400" value={tRCA} onChange={setTRCA} />
          <InputField label="Высота B, мм" placeholder="300" value={tRCB} onChange={setTRCB} />
          <InputField label="Диаметр D, мм" placeholder="315" value={tRCD} onChange={setTRCD} />
          <InputField label="Длина L, мм" placeholder="300" value={tRCL} onChange={setTRCL} />
        </>)}
        {tab === "transition-cc" && (<>
          <InputField label="Диаметр D1, мм" placeholder="500" value={tCCD1} onChange={setTCCD1} />
          <InputField label="Диаметр D2, мм" placeholder="315" value={tCCD2} onChange={setTCCD2} />
          <InputField label="Длина L, мм" placeholder="300" value={tCCL} onChange={setTCCL} />
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
          <InputField label="Диаметр воздуховода D, мм" placeholder="315" value={hoodD} onChange={setHoodD} />
          <InputField label="Высота зонта H, мм" placeholder="200" value={hoodH} onChange={setHoodH} />
        </>)}
        <InputField label="Количество, шт." placeholder="1" value={qty} onChange={setQty} />
      </div>
      <button
        onClick={onCalculate}
        className="bg-foreground text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors duration-200"
      >
        Рассчитать площадь
      </button>
    </div>
  )
}
