import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Какие материалы вы используете?",
    answer:
      "Работаем с оцинкованной сталью толщиной от 0,5 до 1,0 мм для стандартных вентиляционных систем, а также с нержавеющей сталью марок AISI 304 и AISI 316 для пищевой промышленности, медицины и химически агрессивных сред.",
  },
  {
    question: "Какие минимальные и максимальные сроки изготовления?",
    answer:
      "Стандартные позиции (прямые участки, типовые фасонные части) изготавливаем в течение 3–5 рабочих дней. Нестандартные изделия по чертежам — от 5 до 14 дней в зависимости от объёма и сложности. Точные сроки согласуем при оформлении заказа.",
  },
  {
    question: "Можно ли заказать воздуховоды по своим чертежам?",
    answer:
      "Да, принимаем заказы по индивидуальным чертежам и спецификациям. Достаточно передать нам DWG/PDF-файлы или заполнить опросный лист. Наши специалисты проверят размеры и согласуют все детали перед запуском в производство.",
  },
  {
    question: "Есть ли доставка и в каких регионах?",
    answer:
      "Организуем доставку по Москве, Подмосковью и другим регионам России. Работаем с транспортными компаниями для дальних направлений. Самовывоз со склада также возможен. Стоимость и сроки доставки рассчитываются индивидуально.",
  },
  {
    question: "Работаете ли вы с небольшими заказами?",
    answer:
      "Да, принимаем заказы любого объёма — от нескольких фасонных частей до крупных серийных партий. Для небольших заказов действует фиксированный прайс на стандартные позиции.",
  },
  {
    question: "Как оформить заказ?",
    answer:
      "Свяжитесь с нами по телефону, электронной почте или через форму на сайте. Передайте спецификацию или чертежи — мы подготовим коммерческое предложение в течение одного рабочего дня.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}