import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PROMO_URL = "https://functions.poehali.dev/d9308bdb-86ba-4cd8-8802-c08ced05307f";

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

  useEffect(() => {
    fetch(PROMO_URL)
      .then((r) => r.json())
      .then((data) => setPromo(data))
      .catch(() => {});
  }, []);

  if (!visible || !promo || !promo.is_active) return null;

  return (
    <div className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          {promo.image_url && (
            <img
              src={promo.image_url}
              alt={promo.title}
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
        <a
          href="#conditioners"
          className="hidden sm:inline-block bg-white text-orange-600 font-bold text-xs px-3 py-1 rounded-full hover:bg-orange-50 transition-colors"
        >
          Подробнее
        </a>
      </div>
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
