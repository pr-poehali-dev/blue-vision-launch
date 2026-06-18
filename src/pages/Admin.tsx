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

export default function Admin() {
  const [promo, setPromo] = useState<Promo>({
    title: "",
    price: "",
    old_price: "",
    image_url: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(PROMO_URL)
      .then((r) => r.json())
      .then((data) => {
        setPromo(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch(PROMO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(promo),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-8">
          <Icon name="Megaphone" size={24} className="text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900">Акция недели</h1>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название товара
            </label>
            <input
              type="text"
              value={promo.title}
              onChange={(e) => setPromo({ ...promo, title: e.target.value })}
              placeholder="Сплит-система BALLU BSD-09"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Цена акции
              </label>
              <input
                type="text"
                value={promo.price}
                onChange={(e) => setPromo({ ...promo, price: e.target.value })}
                placeholder="22 000 ₽"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Старая цена
              </label>
              <input
                type="text"
                value={promo.old_price}
                onChange={(e) => setPromo({ ...promo, old_price: e.target.value })}
                placeholder="26 000 ₽"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ссылка на фото товара
            </label>
            <input
              type="text"
              value={promo.image_url}
              onChange={(e) => setPromo({ ...promo, image_url: e.target.value })}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {promo.image_url && (
              <img
                src={promo.image_url}
                alt="preview"
                className="mt-2 h-20 w-20 object-cover rounded-lg border"
              />
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPromo({ ...promo, is_active: !promo.is_active })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                promo.is_active ? "bg-orange-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  promo.is_active ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-gray-700">
              {promo.is_active ? "Баннер показывается" : "Баннер скрыт"}
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
          >
            {saving ? "Сохраняю..." : "Сохранить"}
          </button>
          {saved && (
            <div className="flex items-center gap-1 text-green-600 font-medium">
              <Icon name="CheckCircle" size={18} />
              Сохранено!
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Изменения появятся на сайте сразу после сохранения
        </p>
      </div>
    </div>
  );
}
