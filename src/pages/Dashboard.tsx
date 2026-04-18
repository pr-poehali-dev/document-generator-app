import Icon from '@/components/ui/icon';

const stats = [
  { label: 'Документов создано', value: '128', icon: 'FileText', trend: '+12%', color: 'from-blue-500/20 to-blue-600/10' },
  { label: 'Активных клиентов', value: '34', icon: 'Users', trend: '+5', color: 'from-purple-500/20 to-purple-600/10' },
  { label: 'Выставлено счетов', value: '56', icon: 'Receipt', trend: '+8', color: 'from-amber-500/20 to-amber-600/10' },
  { label: 'Оплачено (месяц)', value: '₽ 248 500', icon: 'TrendingUp', trend: '+23%', color: 'from-emerald-500/20 to-emerald-600/10' },
];

const recentDocs = [
  { name: 'Договор №ИВА-001', client: 'Иванов А.В.', date: '16.04.2025', status: 'signed', type: 'Договор' },
  { name: 'Счёт №ИВА-002', client: 'Иванов А.В.', date: '16.04.2025', status: 'pending', type: 'Счёт' },
  { name: 'Акт №ПЕТ-001', client: 'ООО «Петров»', date: '15.04.2025', status: 'paid', type: 'Акт' },
  { name: 'Договор №СИД-001', client: 'Сидорова М.К.', date: '14.04.2025', status: 'draft', type: 'Договор' },
  { name: 'Счёт №КУЗ-003', client: 'ИП Кузнецов', date: '13.04.2025', status: 'paid', type: 'Счёт' },
];

const quickActions = [
  { label: 'Новый договор', icon: 'FilePlus', color: 'text-blue-400' },
  { label: 'Выставить счёт', icon: 'Receipt', color: 'text-amber-400' },
  { label: 'Добавить клиента', icon: 'UserPlus', color: 'text-purple-400' },
  { label: 'Загрузить шаблон', icon: 'Download', color: 'text-emerald-400' },
];

const statusMap: Record<string, { label: string; cls: string }> = {
  signed: { label: 'Подписан', cls: 'badge-paid' },
  pending: { label: 'Ожидает', cls: 'badge-pending' },
  paid: { label: 'Оплачен', cls: 'badge-paid' },
  draft: { label: 'Черновик', cls: 'badge-draft' },
};

export default function Dashboard() {
  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Добро пожаловать!</p>
              <h1 className="text-2xl sm:text-3xl font-montserrat font-bold mb-1">
                Иван <span className="gradient-text">Иванов</span>
              </h1>
              <p className="text-muted-foreground text-sm">ИП · Префикс: <span className="text-primary font-semibold">ИВА</span></p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs text-muted-foreground mb-0.5">Сегодня</div>
              <div className="text-sm font-semibold">18 апр. 2026</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {quickActions.map((a, i) => (
              <button
                key={i}
                className="glass flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/8 transition-all duration-200 text-xs sm:text-sm font-medium"
              >
                <Icon name={a.icon} size={14} className={a.color} />
                <span className="hidden sm:inline">{a.label}</span>
                <span className="sm:hidden">{a.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className={`stat-card animate-fade-in stagger-${i + 1}`}>
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.color} pointer-events-none`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="glass w-9 h-9 rounded-xl flex items-center justify-center">
                  <Icon name={s.icon} size={16} className="text-primary" />
                </div>
                <span className="text-xs text-emerald-400 font-medium bg-emerald-400/10 px-2 py-0.5 rounded-full">
                  {s.trend}
                </span>
              </div>
              <div className="text-xl font-montserrat font-bold mb-0.5">{s.value}</div>
              <div className="text-xs text-muted-foreground leading-tight">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Documents */}
      <div className="glass rounded-2xl overflow-hidden animate-fade-in stagger-5">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5">
          <h2 className="font-montserrat font-semibold">Последние документы</h2>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">Все →</button>
        </div>
        <div>
          {recentDocs.map((doc, i) => (
            <div key={i} className="table-row-custom flex items-center gap-3 px-4 sm:px-6 py-3.5">
              <div className="w-8 h-8 glass rounded-lg flex items-center justify-center shrink-0">
                <Icon name={doc.type === 'Счёт' ? 'Receipt' : doc.type === 'Акт' ? 'ClipboardCheck' : 'FileText'} size={14} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{doc.name}</div>
                <div className="text-xs text-muted-foreground">{doc.client} · {doc.date}</div>
              </div>
              <span className={`badge-status ${statusMap[doc.status].cls} shrink-0`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span className="hidden sm:inline">{statusMap[doc.status].label}</span>
              </span>
              <button className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/8 transition-colors shrink-0">
                <Icon name="MoreHorizontal" size={13} className="text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}