import { useState } from 'react';
import Icon from '@/components/ui/icon';

const invoices = [
  { id: 'ИВА-002', client: 'Иванов А.В.', amount: 25000, date: '16.04.2026', dueDate: '30.04.2026', paid: false, paidDate: null, services: 'Консультация × 5' },
  { id: 'ПЕТ-001', client: 'ООО «Петров»', amount: 80000, date: '15.04.2026', dueDate: '29.04.2026', paid: true, paidDate: '17.04.2026', services: 'Разработка сайта × 1' },
  { id: 'СИД-002', client: 'Сидорова М.К.', amount: 45000, date: '14.04.2026', dueDate: '28.04.2026', paid: false, paidDate: null, services: 'SEO-продвижение × 3' },
  { id: 'КУЗ-003', client: 'ИП Кузнецов', amount: 15000, date: '13.04.2026', dueDate: '27.04.2026', paid: true, paidDate: '14.04.2026', services: 'Консультация × 3' },
  { id: 'НОВ-001', client: 'Новикова Е.С.', amount: 30000, date: '12.04.2026', dueDate: '26.04.2026', paid: false, paidDate: null, services: 'Ведение соцсетей × 1.5' },
  { id: 'МОР-002', client: 'ООО «Мороз»', amount: 120000, date: '10.04.2026', dueDate: '24.04.2026', paid: true, paidDate: '11.04.2026', services: 'Разработка сайта × 2' },
];

export default function Bank() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments'>('invoices');
  const [paidFilter, setPaidFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

  const totalOut = invoices.filter(i => !i.paid).reduce((s, i) => s + i.amount, 0);
  const totalIn = invoices.filter(i => i.paid).reduce((s, i) => s + i.amount, 0);

  const filtered = invoices.filter(i => {
    if (paidFilter === 'paid') return i.paid;
    if (paidFilter === 'unpaid') return !i.paid;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-montserrat font-bold mb-1">Банк и касса</h1>
          <p className="text-muted-foreground text-sm">Управление счетами и учёт платежей</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <Icon name="FileSpreadsheet" size={15} />
            Экспорт в Excel
          </button>
          <button className="btn-gold flex items-center gap-2">
            <Icon name="Receipt" size={16} />
            Выставить счёт
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-muted-foreground">Оплачено</div>
              <div className="glass-gold w-8 h-8 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={15} className="text-primary" />
              </div>
            </div>
            <div className="text-2xl font-montserrat font-bold gradient-text">
              {totalIn.toLocaleString('ru')} ₽
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {invoices.filter(i => i.paid).length} счетов оплачено
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-muted-foreground">Ожидает оплаты</div>
              <div className="glass w-8 h-8 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={15} className="text-amber-400" />
              </div>
            </div>
            <div className="text-2xl font-montserrat font-bold text-amber-400">
              {totalOut.toLocaleString('ru')} ₽
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {invoices.filter(i => !i.paid).length} счетов не оплачено
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-muted-foreground">Всего выставлено</div>
              <div className="glass w-8 h-8 rounded-lg flex items-center justify-center">
                <Icon name="Receipt" size={15} className="text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-montserrat font-bold">
              {invoices.reduce((s, i) => s + i.amount, 0).toLocaleString('ru')} ₽
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {invoices.length} счетов итого
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="text-muted-foreground">Процент сбора платежей</span>
          <span className="font-semibold gradient-text">
            {Math.round(totalIn / (totalIn + totalOut) * 100)}%
          </span>
        </div>
        <div className="h-2.5 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full gradient-gold rounded-full transition-all duration-700"
            style={{ width: `${Math.round(totalIn / (totalIn + totalOut) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Оплачено: {totalIn.toLocaleString('ru')} ₽</span>
          <span>Ожидает: {totalOut.toLocaleString('ru')} ₽</span>
        </div>
      </div>

      {/* Tabs + Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(['invoices', 'payments'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === t ? 'gradient-gold text-background' : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'invoices' ? 'Выставленные счета' : 'Полученные оплаты'}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(['all', 'paid', 'unpaid'] as const).map(f => (
            <button
              key={f}
              onClick={() => setPaidFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                paidFilter === f ? 'glass-gold text-primary border border-primary/20' : 'glass text-muted-foreground'
              }`}
            >
              {f === 'all' ? 'Все' : f === 'paid' ? '✓ Оплачены' : '⏳ Ожидают'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-white/5 text-xs text-muted-foreground uppercase tracking-wider font-medium">
          <div>Номер счёта</div>
          <div>Клиент</div>
          <div>Услуги</div>
          <div>Сумма</div>
          <div>Дата</div>
          <div>Срок оплаты</div>
          <div>Статус</div>
        </div>
        {filtered.map((inv, i) => (
          <div key={i} className="table-row-custom grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4">
            <div className="text-xs font-mono text-primary font-semibold">{inv.id}</div>
            <div className="text-sm font-medium truncate">{inv.client}</div>
            <div className="text-xs text-muted-foreground truncate">{inv.services}</div>
            <div className="font-semibold text-sm">{inv.amount.toLocaleString('ru')} ₽</div>
            <div className="text-sm text-muted-foreground">{inv.date}</div>
            <div className={`text-sm ${!inv.paid && inv.dueDate < '18.04.2026' ? 'text-red-400' : 'text-muted-foreground'}`}>
              {inv.dueDate}
            </div>
            <div className="flex items-center gap-2">
              {inv.paid ? (
                <div className="flex items-center gap-2">
                  <span className="badge-status badge-paid">
                    <Icon name="Check" size={10} />
                    Оплачен {inv.paidDate}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="badge-status badge-pending">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    Ожидает
                  </span>
                  <button className="w-7 h-7 glass-gold rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity" title="Отметить оплаченным">
                    <Icon name="Check" size={12} className="text-primary" />
                  </button>
                </div>
              )}
              <button className="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/8 transition-colors">
                <Icon name="MoreHorizontal" size={13} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QR Info Banner */}
      <div className="glass-gold rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 gradient-gold rounded-xl flex items-center justify-center shrink-0">
          <Icon name="QrCode" size={24} className="text-background" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm mb-0.5">QR-коды для оплаты</div>
          <div className="text-xs text-muted-foreground">
            Каждый счёт содержит QR-код, который сканируется в мобильном приложении банка. Клиент оплачивает в 1 клик.
          </div>
        </div>
        <button className="btn-gold text-sm shrink-0">Подключить эквайринг</button>
      </div>
    </div>
  );
}
