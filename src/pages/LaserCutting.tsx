import { useState, ChangeEvent } from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { HighlightedText } from "../components/HighlightedText"
import { ConsultationWidget } from "../components/ConsultationWidget"
import Icon from "@/components/ui/icon"

const SEND_URL = "https://functions.poehali.dev/a30293a9-d214-4e7b-ae44-ddcfc031adff"

const advantages = [
  {
    icon: "Zap",
    title: "Высокая точность",
    description: "Лазерный раскрой металла с точностью до 0,1 мм — идеальная геометрия деталей любой сложности.",
  },
  {
    icon: "Layers",
    title: "Толщина от 0,5 до 16 мм",
    description: "Режем чёрный металл, оцинкованную и нержавеющую сталь широкого диапазона толщин.",
  },
  {
    icon: "FileText",
    title: "Работа по чертежам",
    description: "Принимаем файлы DWG, DXF, PDF. Раскроим деталь точно по вашей спецификации.",
  },
  {
    icon: "Clock",
    title: "Быстрое изготовление",
    description: "Стандартные заказы выполняем за 1–3 рабочих дня, крупные партии — по согласованному графику.",
  },
  {
    icon: "Ruler",
    title: "Любые формы и размеры",
    description: "Простые заготовки, сложные фигурные детали, перфорация, гравировка — под любые задачи.",
  },
  {
    icon: "Truck",
    title: "Доставка по России",
    description: "Отгружаем готовые изделия транспортными компаниями или самовывозом со склада в Набережных Челнах.",
  },
]

const materials = [
  { name: "Чёрная сталь", range: "0,5 – 16 мм" },
  { name: "Оцинкованная сталь", range: "0,5 – 3 мм" },
  { name: "Нержавеющая сталь", range: "0,5 – 6 мм" },
  { name: "Алюминий", range: "0,5 – 6 мм" },
  { name: "Медь", range: "0,5 – 3 мм" },
  { name: "Бронза", range: "0,5 – 2 мм" },
  { name: "Бронированная сталь", range: "до 12 мм" },
]

const steps = [
  {
    icon: "Send",
    title: "Отправляете заявку",
    description: "Оставляете заявку на сайте, звоните или пишете в мессенджер — прикладываете чертёж, если он есть.",
  },
  {
    icon: "Calculator",
    title: "Получаете расчёт",
    description: "Рассчитываем стоимость и сроки изготовления из вашего или нашего металла — обычно в течение дня.",
  },
  {
    icon: "FileCheck",
    title: "Согласовываем заказ",
    description: "Фиксируем цену, сроки и технические детали — запускаем заказ в производство.",
  },
  {
    icon: "Cog",
    title: "Выполняем работы",
    description: "Режем, гнём, свариваем и красим — контролируем качество на каждом этапе.",
  },
  {
    icon: "Truck",
    title: "Доставляем заказ",
    description: "Отгружаем самовывозом или организуем доставку транспортной компанией по всей России.",
  },
]

const galleryFilters = ["Все", "Резка", "Гибка", "Сварка", "Покраска"] as const

const galleryItems = [
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/1fbe961b-054b-4f0f-b014-4c0bbbb5b284.jpg", label: "Раскрой деталей", category: "Резка" },
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/935e2f4c-dc52-416a-9fa5-91989458dd2b.jpg", label: "Декоративная панель", category: "Резка" },
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/6bdb17ef-82fa-4527-9d50-d1e15717d772.jpg", label: "Лазерная гравировка и перфорация", category: "Резка" },
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/3d5a09d8-5b9e-4155-a565-4d48c3e590c5.jpg", label: "Детали сложной геометрии", category: "Резка" },
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/aafb9720-e037-4249-8afc-312633761720.jpg", label: "Резка листового металла", category: "Резка" },

  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/4f613024-b6eb-459e-b511-7645f8b9095a.jpg", label: "Гиб длиной 3 метра", category: "Гибка" },
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/3e473478-ea6a-4c58-83e2-9370eb300216.jpg", label: "Корпус из гнутого металла", category: "Гибка" },
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/9244203d-392e-4415-ac87-8a44626d7093.jpg", label: "П-образный профиль", category: "Гибка" },
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/74f96269-f8f5-4d0a-bae6-e029f0ee51ec.jpg", label: "Партия кронштейнов и пластин", category: "Гибка" },

  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/783c9a8e-4318-4e9a-9a34-101f2c6e4a0b.jpg", label: "Сварная металлоконструкция", category: "Сварка" },
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/edea7e74-168e-4776-835a-5898e55b0d22.jpg", label: "Корпус из нержавейки", category: "Сварка" },
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/2bd98701-f5b3-4e5a-afff-e3abe4f2a23e.jpg", label: "Сварка каркасных конструкций", category: "Сварка" },

  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/5e42e331-5880-4833-aff3-36bd6b1969b2.jpg", label: "Детали после порошковой покраски", category: "Покраска" },
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/09a2cf99-3844-470b-8a51-60d78a616026.jpg", label: "Покраска в камере", category: "Покраска" },
  { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/2fff9d07-786c-471c-ba74-c0f7b0e9db0e.jpg", label: "Матовое чёрное покрытие", category: "Покраска" },
]

const faqs = [
  {
    question: "Какие файлы нужны для расчёта заказа?",
    answer: "Достаточно прислать чертёж в формате DWG, DXF или PDF. Если чертежа нет — опишите деталь, и наши специалисты помогут подготовить макет.",
  },
  {
    question: "Какой минимальный объём заказа?",
    answer: "Принимаем заказы любого объёма — от одной детали до крупных серийных партий металлопроката.",
  },
  {
    question: "Можно ли заказать гравировку или перфорацию?",
    answer: "Да, лазерная резка позволяет наносить гравировку, делать перфорацию и вырезать отверстия любой сложности за одну операцию.",
  },
  {
    question: "Сколько времени занимает изготовление?",
    answer: "Стандартные заказы — 1–3 рабочих дня. Сроки крупных партий согласуем индивидуально при оформлении заказа.",
  },
]

export default function LaserCutting() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [galleryFilter, setGalleryFilter] = useState<(typeof galleryFilters)[number]>("Все")

  const filteredGallery =
    galleryFilter === "Все" ? galleryItems : galleryItems.filter((item) => item.category === galleryFilter)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }

  const fileToBase64 = (f: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(",")[1])
      reader.onerror = reject
      reader.readAsDataURL(f)
    })

  const handleSend = async () => {
    if (!name.trim() || !phone.trim()) {
      setError("Заполните имя и телефон")
      return
    }
    setSending(true)
    setError("")
    try {
      let file_data = ""
      let file_name = ""
      if (file) {
        file_data = await fileToBase64(file)
        file_name = file.name
      }
      await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          duct_type: "Лазерная резка металла",
          dimensions: description,
          area: "",
          file_data,
          file_name,
        }),
      })
      setSent(true)
    } catch {
      setError("Ошибка отправки. Позвоните нам: 8-927-465-44-64")
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/1f6977e1-411c-4e24-b066-2c36b929ae25.jpg"
            alt="Лазерная резка металла"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-orange-300 mb-4 drop-shadow-lg font-semibold">
            Лазерная резка металла на заказ
          </p>
          <h1
            className="text-5xl md:text-7xl font-medium text-balance text-white mb-6 tracking-tight leading-[0.95]"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)" }}
          >
            Точный раскрой металла
            <br />
            <span className="text-orange-200">по вашим чертежам</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Изготавливаем детали любой сложности из чёрной, оцинкованной и нержавеющей стали. Точность, скорость, доступные цены.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-4 text-sm tracking-wide transition-colors"
            >
              Рассчитать стоимость
            </a>
            <a
              href="tel:+79274654464"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 text-sm tracking-wide hover:bg-white/10 transition-colors"
            >
              <Icon name="Phone" size={16} />
              +7 (927) 465-44-64
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mt-16 pt-10 border-t border-white/15">
            {[
              { value: "2008", label: "год основания" },
              { value: "0,1 мм", label: "точность резки" },
              { value: "0,5–16 мм", label: "диапазон толщин" },
              { value: "1–3 дня", label: "срок изготовления" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-medium text-white">{stat.value}</p>
                <p className="text-white/60 text-xs md:text-sm tracking-wide uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* О производстве */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">О производстве</p>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance">
              Металлообработка <HighlightedText>полного цикла</HighlightedText> с 2008 года
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Более 17 лет мы работаем с чёрным и нержавеющим металлом, превращая листовой прокат в готовые изделия. Наше производство — это не просто цех, это точность, выверенная временем.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background border border-border overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/1f6977e1-411c-4e24-b066-2c36b929ae25.jpg"
                alt="Лазерная резка металла"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3">Лазерная резка</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Мы режем металл чисто и быстро. Доступны любые марки: от конструкционной стали до оцинковки и нержавейки. Диапазон толщин — от 0,5 до 16 мм. Это позволяет нам браться как за ювелирно тонкие детали, так и за мощные силовые элементы.
                </p>
              </div>
            </div>

            <div className="bg-background border border-border overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/bucket/e5849f13-8fb6-4aee-9543-62590e72aaa9.jpeg"
                alt="Гибка металла на оборудовании с ЧПУ"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3">Профессиональная гибка</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Гибка производится на оборудовании с ЧПУ, максимальная длина гиба до 3 метров.
                </p>
              </div>
            </div>

            <div className="bg-background border border-border overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/646b8db6-2604-4df5-8393-01b337cab8bc.jpg"
                alt="Сварка металлоконструкций"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3">Сварка любой сложности</h3>
                <p className="text-muted-foreground leading-relaxed">
                  В нашем арсенале есть всё: полуавтомат для чистых швов, точечная сварка для бесшовного соединения и ручная сварка по кругу (аргонодуговая) для эстетичных и герметичных конструкций.
                </p>
              </div>
            </div>

            <div className="bg-background border border-border overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/61de4259-b33c-4bc9-bf3c-fee9368aabff.jpg"
                alt="Порошковая покраска металла"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3">Порошковая покраска</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Наносим прочное защитно-декоративное покрытие в широкой цветовой гамме — детали и конструкции служат дольше и не боятся коррозии.
                </p>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed mt-12 max-w-3xl">
            Мы берём на себя весь цикл: от раскроя на лазере до финальной сборки и изготовления металлоконструкций.
          </p>
        </div>
      </section>

      {/* Наше оборудование */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наш цех</p>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-balance">
              Собственное <HighlightedText>оборудование</HighlightedText>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mt-6">
              Работаем на профессиональных станках, которые позволяют раскраивать, гнуть и обрабатывать металл с высокой точностью.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/bucket/c541e0c1-7c7a-4ef9-904f-1c78c621ad2f.jpeg", label: "Станок лазерной резки HSG", specs: "Толщина до 16 мм" },
              { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/bucket/e5849f13-8fb6-4aee-9543-62590e72aaa9.jpeg", label: "Листогибочный пресс ERMAKSAN", specs: "Длина гиба до 3 м" },
              { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/bucket/3fd02066-0409-4b48-9ab2-d72c85506dcb.jpeg", label: "Стол раскроя FARLEY", specs: "Размер стола 1500×3000 мм" },
              { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/bucket/1922cdba-8fb0-460b-aa02-cb3bbba3c855.jpeg", label: "Раскрой листового металла", specs: "" },
              { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/d6a16600-05cf-4d00-bf88-601d6465876e.jpg", label: "Камера порошковой покраски", specs: "" },
              { src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/bucket/d2a9f127-d92e-43e2-b350-ee5f75d4caa6.jpeg", label: "Готовые детали с производства", specs: "" },
            ].map((item) => (
              <div key={item.label} className="group relative overflow-hidden bg-secondary">
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">{item.label}</p>
                  {item.specs && <p className="text-orange-300 text-xs font-medium mt-1">{item.specs}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Отрасли применения */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Кому подходит</p>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-balance">
              Детали для <HighlightedText>разных задач</HighlightedText>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mt-6">
              Изготавливаем детали и конструкции под требования конкретной отрасли — с учётом нагрузок, среды эксплуатации и сроков монтажа.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/8285a866-1f78-4587-92bb-1e17c9013673.jpg",
                title: "Машиностроение",
                text: "Кронштейны, опоры и заготовки для промышленного оборудования и станков.",
              },
              {
                src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/5cd9df67-97fd-4983-a372-87a3a99d2334.jpg",
                title: "Вентиляция и HVAC",
                text: "Кронштейны и крепёж для монтажа воздуховодов и вентиляционных систем.",
              },
              {
                src: "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/70230484-a45d-41ba-9f2a-d5642b0a44dc.jpg",
                title: "Декор и благоустройство",
                text: "Ворота, ограждения, перила и другие изделия с фигурным раскроем.",
              },
            ].map((item) => (
              <div key={item.title} className="group relative overflow-hidden bg-background border border-border flex flex-col sm:flex-row">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full sm:w-40 h-40 object-cover shrink-0 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Почему мы</p>
            <h2 className="text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-6xl">
              <HighlightedText>Лазерная резка</HighlightedText> с гарантией качества
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
            {advantages.map((a) => (
              <div key={a.title} className="pl-8 border-l border-border">
                <Icon name={a.icon} size={36} className="mb-4 text-orange-500" />
                <h3 className="text-xl font-medium mb-3">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Материалы */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Материалы</p>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-balance">
              С какими металлами работаем
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {materials.map((m) => (
              <div key={m.name} className="bg-background border border-border p-6 text-center">
                <p className="font-medium text-lg mb-2">{m.name}</p>
                <p className="text-orange-500 font-semibold">{m.range}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Доставка */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Доставка</p>
              <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance">
                Доставим заказ <HighlightedText>в любой город</HighlightedText>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Собственным транспортом доставляем по Набережным Челнам, Елабуге и Нижнекамску. В другие регионы отправляем транспортными компаниями — подберём удобный и выгодный маршрут.
              </p>
              <a
                href="#order"
                className="inline-flex items-center gap-2 text-orange-500 font-medium hover:text-orange-600 transition-colors"
              >
                Обсудить доставку
                <Icon name="ArrowRight" size={18} />
              </a>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "Truck", label: "Набережные Челны" },
                { icon: "MapPin", label: "Елабуга" },
                { icon: "MapPin", label: "Нижнекамск" },
              ].map((city) => (
                <div key={city.label} className="bg-secondary/50 border border-border p-6 text-center flex flex-col items-center gap-3">
                  <Icon name={city.icon} size={28} className="text-orange-500" />
                  <p className="text-sm font-medium">{city.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Галерея работ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Портфолио</p>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-balance">
              Примеры <HighlightedText>выполненных работ</HighlightedText>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {galleryFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setGalleryFilter(filter)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                  galleryFilter === filter
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-border text-muted-foreground hover:border-orange-400 hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item) => (
              <div key={item.label} className="group relative overflow-hidden bg-secondary">
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Порядок работы */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Как мы работаем</p>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-balance">
              Понятный <HighlightedText>порядок работы</HighlightedText>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-500 text-white text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <Icon name={step.icon} size={28} className="text-orange-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
            <h2 className="text-5xl font-medium leading-[1.15] tracking-tight text-balance lg:text-6xl">
              Частые вопросы
            </h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-border py-6">
                <p className="text-lg font-medium mb-2">{faq.question}</p>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форма заказа */}
      <section id="order" className="py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Оформить заказ</p>
            <h2 className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-6 text-balance">
              Нужна лазерная резка?
              <br />
              Рассчитаем стоимость <HighlightedText>за день</HighlightedText>
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10">
              Оставьте заявку — свяжемся с вами и уточним детали заказа.
            </p>

            {sent ? (
              <div className="flex items-center justify-center gap-2 bg-white/10 rounded-xl py-6 px-4">
                <Icon name="CheckCircle" size={22} />
                <span className="font-medium">Заявка отправлена! Мы скоро с вами свяжемся.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-w-md mx-auto">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-orange-400"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Телефон"
                  className="bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-orange-400"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опишите деталь: материал, толщина, размеры (необязательно)"
                  rows={3}
                  className="bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-orange-400 resize-none"
                />
                <label className="flex items-center gap-3 bg-white/10 border border-white/30 border-dashed rounded-lg px-4 py-3 text-white/70 cursor-pointer hover:border-orange-400 transition-colors">
                  <Icon name="Paperclip" size={18} />
                  <span className="text-sm truncate">
                    {file ? file.name : "Прикрепить чертёж (DXF, DWG, PDF, JPG, PNG)"}
                  </span>
                  <input
                    type="file"
                    accept=".dxf,.dwg,.pdf,.jpg,.jpeg,.png,.step,.stp,.cdr"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {error && <p className="text-red-300 text-sm">{error}</p>}
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-lg transition-colors disabled:opacity-60"
                >
                  {sending ? "Отправляю..." : "Отправить заявку"}
                </button>
              </div>
            )}

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 border-t border-primary-foreground/10 pt-10">
              <a href="tel:+79274654464" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Icon name="Phone" size={16} />
                <span className="text-sm">+7 (927) 465-44-64</span>
              </a>
              <a href="mailto:specpromagregat-vent@yandex.ru" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Icon name="Mail" size={16} />
                <span className="text-sm">specpromagregat-vent@yandex.ru</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Icon name="Clock" size={16} />
                <span className="text-sm">Пн–Пт, 7:00–16:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ConsultationWidget />
    </main>
  )
}