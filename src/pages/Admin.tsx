import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PROMO_URL = "https://functions.poehali.dev/d9308bdb-86ba-4cd8-8802-c08ced05307f";
const STATS_URL = "https://functions.poehali.dev/d9308bdb-86ba-4cd8-8802-c08ced05307f/stats";
const REQUESTS_URL = "https://functions.poehali.dev/d9308bdb-86ba-4cd8-8802-c08ced05307f/requests";
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

interface Request {
  id: number;
  name: string;
  phone: string;
  type: string;
  dimensions: string;
  area: string;
  date: string;
}

type Tab = "stats" | "requests" | "promo";

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState<Tab>("stats");

  const [promo, setPromo] = useState<Promo>({ title: "", price: "", old_price: "", image_url: "", is_active: true });
  const [stats, setStats] = useState<Stats | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [reqLoading, setReqLoading] = useState(false);
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

  useEffect(() => {
    if (!auth || tab !== "requests") return;
    setReqLoading(true);
    const url = typeFilter ? `${REQUESTS_URL}?type=${encodeURIComponent(typeFilter)}` : REQUESTS_URL;
    fetch(url).then((r) => r.json()).then((data) => {
      setRequests(data.requests || []);
      setTypes(data.types || []);
      setReqLoading(false);
    }).catch(() => setReqLoading(false));
  }, [auth, tab, typeFilter]);

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
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Табы */}
        <div className="flex gap-2 bg-white rounded-2xl shadow p-2">
          {([
            { key: "stats", label: "Статистика", icon: "BarChart2" },
            { key: "requests", label: "Все заявки", icon: "ClipboardList" },
            { key: "promo", label: "Акция недели", icon: "Megaphone" },
          ] as { key: Tab; label: string; icon: string }[]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                tab === t.key ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon name={t.icon} size={16} />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Статистика */}
        {tab === "stats" && stats && (
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

        {/* Все заявки */}
        {tab === "requests" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <Icon name="ClipboardList" size={22} className="text-orange-500" />
                <h2 className="text-xl font-bold text-gray-900">Все заявки</h2>
              </div>
              <span className="text-sm text-gray-400">{requests.length} шт.</span>
            </div>

            {/* Фильтр */}
            <div className="flex flex-wrap gap-2 mb-5">
              <button
                onClick={() => setTypeFilter("")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${!typeFilter ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                Все
              </button>
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t === typeFilter ? "" : t)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${typeFilter === t ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {reqLoading ? (
              <p className="text-gray-400 text-sm text-center py-8">Загрузка...</p>
            ) : requests.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">Заявок нет</p>
            ) : (
              <div className="space-y-3">
                {requests.map((r) => (
                  <div key={r.id} className="border border-gray-100 rounded-xl p-4 hover:border-orange-200 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-900">{r.name}</p>
                          <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full shrink-0">{r.type}</span>
                        </div>
                        <a href={`tel:${r.phone.replace(/\D/g, "")}`} className="text-sm text-orange-500 hover:underline block">{r.phone}</a>
                        {r.dimensions && <p className="text-xs text-gray-500 mt-1">{r.dimensions}{r.area ? ` · ${r.area} м²` : ""}</p>}
                      </div>
                      <p className="text-xs text-gray-400 shrink-0">{r.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Акция недели */}
        {tab === "promo" && (
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
        )}

      </div>
    </div>
  );
}
