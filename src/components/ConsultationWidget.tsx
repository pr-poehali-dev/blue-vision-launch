import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import Icon from "@/components/ui/icon"
import { isValidPhone } from "@/lib/validatePhone"

const SEND_URL = "https://functions.poehali.dev/a30293a9-d214-4e7b-ae44-ddcfc031adff"

export function ConsultationWidget() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSend = async () => {
    if (!name.trim() || !phone.trim()) {
      setError("Заполните имя и телефон")
      return
    }
    if (!isValidPhone(phone)) {
      setError("Проверьте номер телефона")
      return
    }
    setSending(true)
    setError("")
    try {
      await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          duct_type: "Быстрая консультация",
          dimensions: "",
          area: "",
        }),
      })
      setSent(true)
    } catch {
      setError("Ошибка отправки. Позвоните нам: 8-927-465-44-64")
    } finally {
      setSending(false)
    }
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      setSent(false)
      setName("")
      setPhone("")
      setError("")
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-3.5 rounded-full shadow-lg shadow-black/20 transition-colors"
        aria-label="Получить консультацию"
      >
        <Icon name="MessageCircle" size={20} />
        <span className="hidden sm:inline text-sm">Получить консультацию</span>
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Получить консультацию</DialogTitle>
            <DialogDescription>
              Оставьте контакты — специалист перезвонит и ответит на вопросы.
            </DialogDescription>
          </DialogHeader>

          {sent ? (
            <div className="flex items-center gap-2 bg-secondary rounded-lg py-6 px-4">
              <Icon name="CheckCircle" size={22} className="text-orange-500 shrink-0" />
              <span className="font-medium">Заявка отправлена! Мы скоро с вами свяжемся.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Телефон"
                className="border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleSend}
                disabled={sending}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-60"
              >
                {sending ? "Отправляю..." : "Перезвоните мне"}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}