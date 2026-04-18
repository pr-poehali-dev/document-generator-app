import { useState } from 'react';
import Icon from '@/components/ui/icon';

const categories = ['Все', 'Договоры', 'Счета', 'Акты', 'Прочее'];

const templates = [
  {
    id: 1, name: 'Договор оказания услуг', category: 'Договоры',
    desc: 'Стандартный договор для физических лиц и ИП', icon: 'FileText',
    uses: 1240, popular: true, color: 'from-blue-500/20 to-blue-600/5'
  },
  {
    id: 2, name: 'Договор подряда', category: 'Договоры',
    desc: 'Выполнение работ с фиксированным результатом', icon: 'Hammer',
    uses: 890, popular: false, color: 'from-purple-500/20 to-purple-600/5'
  },
  {
    id: 3, name: 'Счёт на оплату', category: 'Счета',
    desc: 'Платёжный документ с QR-кодом для оплаты', icon: 'Receipt',
    uses: 3210, popular: true, color: 'from-amber-500/20 to-amber-600/5'
  },
  {
    id: 4, name: 'Акт выполненных работ', category: 'Акты',
    desc: 'Подтверждение оказания услуг или выполнения работ', icon: 'ClipboardCheck',
    uses: 2100, popular: true, color: 'from-emerald-500/20 to-emerald-600/5'
  },
  {
    id: 5, name: 'Договор аренды', category: 'Договоры',
    desc: 'Аренда помещения, оборудования или транспорта', icon: 'Key',
    uses: 450, popular: false, color: 'from-rose-500/20 to-rose-600/5'
  },
  {
    id: 6, name: 'Акт сверки', category: 'Акты',
    desc: 'Сверка взаиморасчётов между сторонами', icon: 'ArrowLeftRight',
    uses: 320, popular: false, color: 'from-cyan-500/20 to-cyan-600/5'
  },
  {
    id: 7, name: 'Счёт-фактура', category: 'Счета',
    desc: 'Документ для плательщиков НДС', icon: 'FileSpreadsheet',
    uses: 780, popular: false, color: 'from-orange-500/20 to-orange-600/5'
  },
  {
    id: 8, name: 'Агентский договор', category: 'Договоры',
    desc: 'Посреднические услуги и агентское вознаграждение', icon: 'Handshake',
    uses: 230, popular: false, color: 'from-violet-500/20 to-violet-600/5'
  },
];

export default function Templates() {
  const [cat, setCat] = useState('Все');
  const [search, setSearch] = useState('');

  const filtered = templates.filter(t =>
    (cat === 'Все' || t.category === cat) &&
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-montserrat font-bold mb-1">Библиотека шаблонов</h1>
          <p className="text-muted-foreground text-sm">Готовые шаблоны документов для вашего бизнеса</p>
        </div>
        <button className="btn-gold flex items-center gap-2">
          <Icon name="Upload" size={16} />
          Загрузить свой
        </button>
      </div>

      {/* Search + Filter */}
      <div className="glass rounded-2xl p-4 flex items-center gap-4">
        <div className="flex-1 flex items-center gap-3 glass rounded-xl px-4 py-2.5">
          <Icon name="Search" size={16} className="text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск шаблонов..."
            className="bg-transparent text-sm flex-1 focus:outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                cat === c
                  ? 'gradient-gold text-background'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-4">
        {filtered.map((t, i) => (
          <div key={t.id} className={`glass rounded-2xl p-5 relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-200 animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${t.color} pointer-events-none`} />
            {t.popular && (
              <div className="absolute top-3 right-3 gradient-gold text-background text-xs font-semibold px-2 py-0.5 rounded-full">
                Топ
              </div>
            )}
            <div className="relative">
              <div className="glass w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                <Icon name={t.icon} size={20} className="text-primary" fallback="FileText" />
              </div>
              <h3 className="font-montserrat font-semibold text-sm mb-1">{t.name}</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{t.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="Users" size={11} />
                  {t.uses.toLocaleString('ru')} раз
                </div>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/10">
                    <Icon name="Eye" size={12} className="text-muted-foreground" />
                  </button>
                  <button className="w-7 h-7 gradient-gold rounded-lg flex items-center justify-center">
                    <Icon name="Plus" size={12} className="text-background" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
