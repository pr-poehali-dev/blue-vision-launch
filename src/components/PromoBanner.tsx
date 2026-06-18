import { useState } from "react";
import Icon from "@/components/ui/icon";

export function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/2b2e10ed-fea8-4ca4-a595-2229563f0a43.jpg"
            alt="BALLU BSD-09"
            className="h-10 w-10 object-cover rounded shadow-md"
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-xs uppercase tracking-widest font-semibold opacity-90">
              Акция недели
            </span>
            <span className="font-bold text-sm sm:text-base">
              Сплит-система BALLU BSD-09
            </span>
            <span className="text-orange-100 text-sm line-through hidden sm:inline">
              26 000 ₽
            </span>
            <span className="text-white font-extrabold text-base sm:text-lg">
              22 000 ₽
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
