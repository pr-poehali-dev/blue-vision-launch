import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PROMO_URL = "https://functions.poehali.dev/d9308bdb-86ba-4cd8-8802-c08ced05307f";
const STATS_URL = "https://functions.poehali.dev/d9308bdb-86ba-4cd8-8802-c08ced05307f/stats";
const ADMIN_PASSWORD = "Dom_270813";

interface Promo {
  title: string;
  price: string;
  old_price: string;
  image_url: string;
  is_active: boolean;
}

interface Stats {
  today: number;
  week: number;
  month: number;
  total: number;
  recent: { name: string; phone: string; type: string; date: string }[];
}

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  const [promo, setPromo] = useState<Promo>({ title: "", price: "", old_price: "", image_url: "", is_active: true });
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!auth) return;
    Promise.all([
      fetch(PROMO_URL).then((r) => r.json()),
      fetch(STATS_URL).then((r) => r.json()),
    ]).then(([promoData, statsData]) => {
      setPromo(promoData);
      setStats(statsData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [auth]);

  const handleLogin = () => {
    if (pwInput === ADMIN_PASSWORD) { setAuth(true); setPwError(false); }
    else setPwError(true);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch(PROMO_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(promo) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Lock" size={22} className="text-orange-500" />
            <h1 className="text-xl font-bold text-gray-900">Вход в админку</h1>
          </div>
          <input
            type="password"
            value={pwInput}
            onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Введите пароль"
            className={`w-full border rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-3 ${pwError ? "border-red-400" : "border-gray-300"}`}
          />
          {pwError && <p className="text-red-500 text-sm mb-3">Неверный пароль</p>}
          <button onClick={handleLogin} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl transition-colors">
            Войти
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Статистика */}
        {stats && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-5">
              <Icon name="BarChart2" size={22} className="text-orange-500" />
              <h2 className="text-xl font-bold text-gray-900">Заявки</h2>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: "Сегодня", value: stats.today },
                { label: "За неделю", value: stats.week },
                { label: "За месяц", value: stats.month },
                { label: "Всего", value: stats.total },
              ].map((s) => (
                <div key={s.label} className="bg-orange-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-orange-600">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            {stats.recent.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Последние заявки</p>
                <div className="space-y-2">
                  {stats.recent.map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{r.name}</p>
                        <p className="text-xs text-gray-500">{r.phone} · {r.type}</p>
                      </div>
                      <p className="text-xs text-gray-400">{r.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Акция недели */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Megaphone" size={22} className="text-orange-500" />
            <h2 className="text-xl font-bold text-gray-900">Акция недели</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название товара</label>
              <input type="text" value={promo.title} onChange={(e) => setPromo({ ...promo, title: e.target.value })}
                placeholder="Сплит-система BALLU BSD-09"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Цена акции</label>
                <input type="text" value={promo.price} onChange={(e) => setPromo({ ...promo, price: e.target.value })}
                  placeholder="22 000 ₽"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Старая цена</label>
                <input type="text" value={promo.old_price} onChange={(e) => setPromo({ ...promo, old_price: e.target.value })}
                  placeholder="26 000 ₽"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ссылка на фото</label>
              <input type="text" value={promo.image_url} onChange={(e) => setPromo({ ...promo, image_url: e.target.value })}
                placeholder="https://..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400" />
              {promo.image_url && <img src={promo.image_url} alt="preview" className="mt-2 h-20 w-20 object-cover rounded-lg border" />}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPromo({ ...promo, is_active: !promo.is_active })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${promo.is_active ? "bg-orange-500" : "bg-gray-300"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${promo.is_active ? "translate-x-6" : "translate-x-1"}`} />
              </button>
              <span className="text-sm text-gray-700">{promo.is_active ? "Баннер показывается" : "Баннер скрыт"}</span>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <button onClick={handleSave} disabled={saving}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60">
              {saving ? "Сохраняю..." : "Сохранить"}
            </button>
            {saved && (
              <div className="flex items-center gap-1 text-green-600 font-medium">
                <Icon name="CheckCircle" size={18} />
                Сохранено!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
