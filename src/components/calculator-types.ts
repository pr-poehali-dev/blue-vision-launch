export type Tab =
  | "rect" | "round"
  | "elbow-rect" | "elbow-round"
  | "transition-rr" | "transition-rc" | "transition-cc"
  | "tee" | "cap" | "hood"

export type FormStep = "calc" | "form" | "done"

export interface Result {
  area: number
  label: string
  details: string
}

export const SEND_URL = "https://functions.poehali.dev/a30293a9-d214-4e7b-ae44-ddcfc031adff"

export const TAB_IMAGES: Record<Tab, string> = {
  "rect": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/66b0c3b2-221e-45f8-a45e-8707afd5fac7.jpg",
  "round": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/8c22b3b5-ff6c-43f4-815c-2d8deacf2b3f.jpg",
  "elbow-rect": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/a522dbf8-4ea4-4b49-afe9-378233547aae.jpg",
  "elbow-round": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/12d64ffb-2cb8-461e-b016-9e2bdbbbf5ae.jpg",
  "transition-rr": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/c671e82f-3db5-4194-9058-569031d0f0d9.jpg",
  "transition-rc": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/7b829950-c8b7-4c3d-9489-5c1c129bd651.jpg",
  "transition-cc": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/e2fb7fe5-a7a0-48b3-ad0a-a2c7878e1c9c.jpg",
  "tee": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/75efdfaa-408f-409c-82be-25f9c8c2efd6.jpg",
  "cap": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/c3d63562-93b4-44ed-9b42-0f3174e7c9c2.jpg",
  "hood": "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/1949ba48-b522-4137-8998-c34a6e380a9b.jpg",
}

export const CAP_IMAGE_ROUND = "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/fb61936f-ca89-490c-86fe-a44ed1a49f39.jpg"
export const CAP_IMAGE_RECT = "https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/c3d63562-93b4-44ed-9b42-0f3174e7c9c2.jpg"

export const TAB_LABELS: Record<Tab, string> = {
  "rect": "Прямоугольный воздуховод",
  "round": "Круглый воздуховод",
  "elbow-rect": "Отвод прямоугольный",
  "elbow-round": "Отвод круглый",
  "transition-rr": "Переход прямоуг. → прямоуг.",
  "transition-rc": "Переход прямоуг. → круглый",
  "transition-cc": "Переход круглый → круглый",
  "tee": "Тройник",
  "cap": "Заглушка",
  "hood": "Зонт вытяжной",
}

export const TAB_BADGES: Record<Tab, { label: string; x: number; y: number }[]> = {
  "rect":          [{ label: "A", x: 18, y: 50 }, { label: "B", x: 50, y: 82 }, { label: "L", x: 80, y: 30 }],
  "round":         [{ label: "D", x: 20, y: 50 }, { label: "L", x: 72, y: 25 }],
  "elbow-rect":    [{ label: "A", x: 22, y: 22 }, { label: "B", x: 75, y: 50 }, { label: "R", x: 42, y: 68 }],
  "elbow-round":   [{ label: "D", x: 22, y: 30 }, { label: "R", x: 45, y: 70 }],
  "transition-rr": [{ label: "A1×B1", x: 12, y: 50 }, { label: "A2×B2", x: 78, y: 50 }, { label: "L", x: 50, y: 82 }],
  "transition-rc": [{ label: "A×B", x: 12, y: 50 }, { label: "D", x: 82, y: 50 }, { label: "L", x: 50, y: 82 }],
  "transition-cc": [{ label: "D1", x: 14, y: 40 }, { label: "D2", x: 80, y: 45 }, { label: "L", x: 50, y: 82 }],
  "tee":           [{ label: "A×B", x: 50, y: 72 }, { label: "C×D", x: 72, y: 22 }],
  "cap":           [{ label: "A", x: 38, y: 22 }, { label: "B", x: 18, y: 52 }],
  "hood":          [{ label: "D", x: 50, y: 82 }, { label: "H", x: 18, y: 50 }],
}

export const tabs: { id: Tab; label: string; group: string }[] = [
  { id: "rect", label: "Прямоугольный", group: "Воздуховоды" },
  { id: "round", label: "Круглый", group: "Воздуховоды" },
  { id: "elbow-rect", label: "Отвод прямоуг.", group: "Отводы" },
  { id: "elbow-round", label: "Отвод круглый", group: "Отводы" },
  { id: "transition-rr", label: "Пр. → Пр.", group: "Переходы" },
  { id: "transition-rc", label: "Пр. → Кр.", group: "Переходы" },
  { id: "transition-cc", label: "Кр. → Кр.", group: "Переходы" },
  { id: "tee", label: "Тройник", group: "Фасонные части" },
  { id: "cap", label: "Заглушка", group: "Фасонные части" },
  { id: "hood", label: "Зонт", group: "Фасонные части" },
]

export const groups = ["Воздуховоды", "Отводы", "Переходы", "Фасонные части"]
