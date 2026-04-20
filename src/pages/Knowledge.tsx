import { useState } from "react";
import Icon from "@/components/ui/icon";

interface KnowledgeProps {
  onBack: () => void;
  onLogin: () => void;
}

const articles = [
  {
    category: "Начало работы",
    icon: "Rocket",
    color: "text-blue-400",
    bg: "from-blue-500/20 to-blue-600/10",
    items: [
      { title: "Как зарегистрироваться в ДокуПро", desc: "Пошаговая инструкция по созданию аккаунта" },
      { title: "Настройка профиля и реквизитов", desc: "Заполните данные ИП или ООО для документов" },
      { title: "Первый документ за 3 минуты", desc: "Создайте договор или счёт с нуля" },
    ],
  },
  {
    category: "Документы",
    icon: "FileText",
    color: "text-amber-400",
    bg: "from-amber-500/20 to-amber-600/10",
    items: [
      { title: "Виды документов: договор, счёт, акт", desc: "Чем отличаются и когда использовать" },
      { title: "Шаблоны документов", desc: "Готовые шаблоны под разные виды деятельности" },
      { title: "Нумерация и префиксы документов", desc: "Как работает автоматическая нумерация" },
    ],
  },
  {
    category: "Клиенты",
    icon: "Users",
    color: "text-purple-400",
    bg: "from-purple-500/20 to-purple-600/10",
    items: [
      { title: "Добавление клиента в базу", desc: "Физические лица, ИП и юридические лица" },
      { title: "История документов по клиенту", desc: "Все сделки в одном месте" },
      { title: "Экспорт базы клиентов", desc: "Выгрузка в Excel, CSV или для 1С" },
    ],
  },
  {
    category: "Платежи и учёт",
    icon: "Receipt",
    color: "text-emerald-400",
    bg: "from-emerald-500/20 to-emerald-600/10",
    items: [
      { title: "Учёт оплат и задолженностей", desc: "Контроль статусов по каждому счёту" },
      { title: "Статистика и отчёты", desc: "Обороты за период, активные клиенты" },
      { title: "Интеграция с банком", desc: "Как связать расчётный счёт с системой" },
    ],
  },
];

export default function Knowledge({ onBack, onLogin }: KnowledgeProps) {
  const [search, setSearch] = useState("");
  const [openArticle, setOpenArticle] = useState<string | null>(null);

  const filtered = articles.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        search === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* Фоновые пятна */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-amber-500/4 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-blue-500/4 blur-[80px]" />
      </div>

      {/* Шапка */}
      <header className="sticky top-0 z-20 flex items-center gap-3 px-4 py-4 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <button
          onClick={onBack}
          className="w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-white/8 transition-colors shrink-0"
        >
          <Icon name="ArrowLeft" size={16} className="text-muted-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-montserrat font-bold text-base leading-tight">Библиотека знаний</h1>
          <p className="text-xs text-muted-foreground">Всё о работе с ДокуПро</p>
        </div>
        <button
          onClick={onLogin}
          className="btn-gold flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
        >
          <span className="text-background">Войти</span>
        </button>
      </header>

      {/* Поиск */}
      <div className="px-4 pt-4 pb-2 relative z-10">
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по статьям..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass rounded-xl pl-9 pr-4 py-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Hero */}
      {search === "" && (
        <div className="px-4 pt-2 pb-4 relative z-10">
          <div className="glass rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-transparent to-blue-500/5 pointer-events-none rounded-2xl" />
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 gradient-gold rounded-2xl flex items-center justify-center glow-gold shrink-0">
                <Icon name="BookOpen" size={26} className="text-background" />
              </div>
              <div>
                <h2 className="font-montserrat font-bold text-lg leading-tight mb-1">
                  Всё что нужно<br />
                  <span className="gradient-text">для старта</span>
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Инструкции, советы и ответы на частые вопросы
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Статьи */}
      <div className="flex-1 px-4 pb-8 space-y-5 relative z-10">
        {filtered.map((cat, ci) => (
          <div key={ci}>
            {/* Категория */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-7 h-7 glass rounded-lg flex items-center justify-center`}>
                <Icon name={cat.icon} size={14} className={cat.color} />
              </div>
              <span className="font-montserrat font-semibold text-sm">{cat.category}</span>
            </div>

            {/* Статьи категории */}
            <div className="space-y-2">
              {cat.items.map((item, ii) => {
                const key = `${ci}-${ii}`;
                const isOpen = openArticle === key;
                return (
                  <button
                    key={ii}
                    onClick={() => setOpenArticle(isOpen ? null : key)}
                    className="w-full glass rounded-2xl p-4 text-left hover:bg-white/5 transition-all duration-200 relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.bg} pointer-events-none rounded-2xl opacity-40`} />
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-0.5">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                        {isOpen && (
                          <div className="mt-3 pt-3 border-t border-white/10 text-xs text-muted-foreground leading-relaxed">
                            Подробная статья по этой теме появится после запуска полной версии. Следите за обновлениями!
                          </div>
                        )}
                      </div>
                      <Icon
                        name={isOpen ? "ChevronUp" : "ChevronRight"}
                        size={15}
                        className="text-muted-foreground shrink-0 mt-0.5"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Icon name="SearchX" size={32} className="text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Ничего не найдено</p>
            <button onClick={() => setSearch("")} className="text-primary text-sm mt-2 hover:underline">
              Сбросить поиск
            </button>
          </div>
        )}
      </div>

      {/* CTA внизу */}
      <div className="sticky bottom-0 px-4 pb-6 pt-4 bg-gradient-to-t from-background via-background/95 to-transparent z-20">
        <button
          onClick={onLogin}
          className="btn-gold w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-montserrat font-bold text-base shadow-lg"
        >
          <Icon name="LogIn" size={18} className="text-background" />
          <span className="text-background">Начать работу — это бесплатно</span>
        </button>
      </div>
    </div>
  );
}
