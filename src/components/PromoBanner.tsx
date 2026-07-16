import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { isValidPhone } from "@/lib/validatePhone";

const PROMO_URL = "https://functions.poehali.dev/d9308bdb-86ba-4cd8-8802-c08ced05307f";
const SEND_URL = "https://functions.poehali.dev/a30293a9-d214-4e7b-ae44-ddcfc031adff";

interface Promo {
  title: string;
  price: string;
  old_price: string;
  image_url: string;
  is_active: boolean;
}

export function PromoBanner() {
  const [visible, setVisible] = useState(true);
  const [promo, setPromo] = useState<Promo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch(PROMO_URL)
      .then((r) => r.json())
      .then((data) => setPromo(data))
      .catch(() => {});
  }, []);

  const handleSend = async () => {
    if (!name.trim() || !phone.trim() || !isValidPhone(phone)) return;
    setSending(true);
    await fetch(SEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        duct_type: promo?.title || "Акция недели",
        dimensions: promo?.price || "",
        area: "",
      }),
    });
    setSending(false);
    setSent(true);
    setTimeout(() => { setSent(false); setShowForm(false); setVisible(false); }, 3000);
  };

  if (!visible || !promo || !promo.is_active) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white z-40">
      {!showForm ? (
        <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            {promo.image_url && (
              <img
                src={promo.image_url}
                alt={promo.title}
                loading="lazy"
                decoding="async"
                className="h-10 w-10 object-cover rounded shadow-md"
              />
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="text-xs uppercase tracking-widest font-semibold opacity-90">
                Акция недели
              </span>
              <span className="font-bold text-sm sm:text-base">{promo.title}</span>
              {promo.old_price && (
                <span className="text-orange-100 text-sm line-through hidden sm:inline">
                  {promo.old_price}
                </span>
              )}
              <span className="text-white font-extrabold text-base sm:text-lg">
                {promo.price}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-orange-600 font-bold text-xs px-3 py-1.5 rounded-full hover:bg-orange-50 transition-colors whitespace-nowrap"
          >
            Заказать
          </button>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 flex-wrap">
          {sent ? (
            <div className="flex items-center gap-2 py-1">
              <Icon name="CheckCircle" size={18} />
              <span className="font-semibold text-sm">Заявка отправлена! Перезвоним скоро.</span>
            </div>
          ) : (
            <>
              <span className="font-bold text-sm hidden sm:inline">{promo.title} — {promo.price}</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="bg-white/20 border border-white/40 rounded-lg px-3 py-1.5 text-white placeholder-white/70 text-sm focus:outline-none focus:border-white w-32"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Телефон"
                className="bg-white/20 border border-white/40 rounded-lg px-3 py-1.5 text-white placeholder-white/70 text-sm focus:outline-none focus:border-white w-36"
              />
              <button
                onClick={handleSend}
                disabled={sending || !name.trim() || !phone.trim() || !isValidPhone(phone)}
                className="bg-white text-orange-600 font-bold text-xs px-3 py-1.5 rounded-full hover:bg-orange-50 transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                {sending ? "Отправляю..." : "Отправить"}
              </button>
            </>
          )}
        </div>
      )}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Закрыть"
      >
        <Icon name="X" size={16} />
      </button>
    </div>
  );
}