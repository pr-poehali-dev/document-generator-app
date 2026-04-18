import { useState } from 'react';
import Icon from '@/components/ui/icon';

const docs = [
  { id: 'ИВА-001', name: 'Договор оказания услуг', client: 'Иванов А.В.', type: 'Договор', date: '16.04.2026', amount: 25000, status: 'signed' },
  { id: 'ИВА-002', name: 'Счёт на оплату', client: 'Иванов А.В.', type: 'Счёт', date: '16.04.2026', amount: 25000, status: 'pending' },
  { id: 'ПЕТ-001', name: 'Акт выполненных работ', client: 'ООО «Петров»', type: 'Акт', date: '15.04.2026', amount: 80000, status: 'paid' },
  { id: 'СИД-001', name: 'Договор подряда', client: 'Сидорова М.К.', type: 'Договор', date: '14.04.2026', amount: 45000, status: 'draft' },
  { id: 'КУЗ-003', name: 'Счёт на оплату', client: 'ИП Кузнецов', type: 'Счёт', date: '13.04.2026', amount: 15000, status: 'paid' },
  { id: 'НОВ-001', name: 'Договор оказания услуг', client: 'Новикова Е.С.', type: 'Договор', date: '12.04.2026', amount: 30000, status: 'signed' },
  { id: 'МОР-002', name: 'Акт выполненных работ', client: 'ООО «Мороз»', type: 'Акт', date: '10.04.2026', amount: 120000, status: 'draft' },
];

const statusMap: Record<string, { label: string; cls: string; icon: string }> = {
  signed: { label: 'Подписан', cls: 'badge-paid', icon: 'PenLine' },
  pending: { label: 'Ожидает', cls: 'badge-pending', icon: 'Clock' },
  paid: { label: 'Оплачен', cls: 'badge-paid', icon: 'CheckCircle' },
  draft: { label: 'Черновик', cls: 'badge-draft', icon: 'FileEdit' },
};

const typeIcons: Record<string, string> = {
  'Договор': 'FileText',
  'Счёт': 'Receipt',
  'Акт': 'ClipboardCheck',
};

export default function Documents() {
  const [filter, setFilter] = useState('Все');
  const [search, setSearch] = useState('');

  const filters = ['Все', 'Договоры', 'Счета', 'Акты', 'Черновики'];

  const filtered = docs.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.client.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Все' ||
      (filter === 'Договоры' && d.type === 'Договор') ||
      (filter === 'Счета' && d.type === 'Счёт') ||
      (filter === 'Акты' && d.type === 'Акт') ||
      (filter === 'Черновики' && d.status === 'draft');
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-montserrat font-bold mb-1">Мои документы</h1>
          <p className="text-muted-foreground text-sm">{docs.length} документов · {docs.filter(d => d.status === 'paid').length} оплачено</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <Icon name="Download" size={15} />
            Экспорт
          </button>
          <button className="btn-gold flex items-center gap-2">
            <Icon name="Plus" size={16} />
            Новый документ
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="glass rounded-2xl p-4 flex items-center gap-4">
        <div className="flex-1 flex items-center gap-3 glass rounded-xl px-4 py-2.5">
          <Icon name="Search" size={16} className="text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по названию, клиенту, номеру..."
            className="bg-transparent text-sm flex-1 focus:outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? 'gradient-gold text-background'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1fr_2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-white/5 text-xs text-muted-foreground uppercase tracking-wider font-medium">
          <div>Номер</div>
          <div>Название</div>
          <div>Клиент</div>
          <div>Тип</div>
          <div>Дата</div>
          <div>Сумма</div>
          <div>Статус</div>
        </div>
        {filtered.map((doc, i) => (
          <div key={i} className="table-row-custom grid grid-cols-[1fr_2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 glass rounded-lg flex items-center justify-center shrink-0">
                <Icon name={typeIcons[doc.type] || 'FileText'} size={13} className="text-primary" fallback="FileText" />
              </div>
              <span className="text-xs font-mono text-primary font-semibold">{doc.id}</span>
            </div>
            <div className="text-sm font-medium truncate">{doc.name}</div>
            <div className="text-sm text-muted-foreground truncate">{doc.client}</div>
            <div className="text-xs glass px-2 py-1 rounded-lg w-fit">{doc.type}</div>
            <div className="text-sm text-muted-foreground">{doc.date}</div>
            <div className="font-semibold text-sm">{doc.amount.toLocaleString('ru')} ₽</div>
            <div className="flex items-center gap-2">
              <span className={`badge-status ${statusMap[doc.status].cls}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {statusMap[doc.status].label}
              </span>
              <button className="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/8 transition-colors">
                <Icon name="MoreHorizontal" size={13} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Всего документов', value: docs.length, icon: 'FileText' },
          { label: 'На подписании', value: docs.filter(d => d.status === 'pending').length, icon: 'Clock' },
          { label: 'Подписано', value: docs.filter(d => d.status === 'signed').length, icon: 'PenLine' },
          { label: 'Сумма оплат', value: docs.filter(d => d.status === 'paid').reduce((s, d) => s + d.amount, 0).toLocaleString('ru') + ' ₽', icon: 'TrendingUp' },
        ].map((s, i) => (
          <div key={i} className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="glass-gold w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
              <Icon name={s.icon} size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-lg font-montserrat font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
