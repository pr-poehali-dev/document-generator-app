import { useState } from 'react';
import Icon from '@/components/ui/icon';

const clients = [
  {
    id: '1', type: 'person',
    name: 'Иванов Александр Владимирович',
    phone: '+7 900 123-45-67', email: 'ivanov@mail.ru',
    docs: 5, total: 125000, prefix: 'ИВА',
  },
  {
    id: '2', type: 'company',
    name: 'ООО «Петров и партнёры»',
    inn: '7712345678', ogrn: '1027700123456',
    phone: '+7 495 000-00-01', email: 'info@petrov.ru',
    docs: 3, total: 200000, prefix: 'ПЕТ',
  },
  {
    id: '3', type: 'ip',
    name: 'ИП Сидорова Мария Константиновна',
    inn: '771234567890',
    phone: '+7 926 555-44-33', email: 'sidorova@gmail.com',
    docs: 2, total: 75000, prefix: 'СИД',
  },
  {
    id: '4', type: 'person',
    name: 'Кузнецов Дмитрий Андреевич',
    phone: '+7 903 777-88-99', email: 'kuznetsov@ya.ru',
    docs: 4, total: 60000, prefix: 'КУЗ',
  },
  {
    id: '5', type: 'company',
    name: 'ООО «Мороз Консалтинг»',
    inn: '7701234567', ogrn: '1037700987654',
    phone: '+7 499 123-00-00', email: 'office@moroz.com',
    docs: 1, total: 120000, prefix: 'МОР',
  },
];

const typeLabels: Record<string, string> = {
  person: 'Физ. лицо',
  ip: 'ИП',
  company: 'Юр. лицо',
};

const typeColors: Record<string, string> = {
  person: 'text-blue-400 bg-blue-400/10',
  ip: 'text-amber-400 bg-amber-400/10',
  company: 'text-purple-400 bg-purple-400/10',
};

export default function Clients() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newType, setNewType] = useState('person');

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone || '').includes(search) ||
    (c.email || '').includes(search)
  );

  const selectedClient = clients.find(c => c.id === selected);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-montserrat font-bold mb-1">Клиенты</h1>
          <p className="text-muted-foreground text-sm">{clients.length} клиентов в базе</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-gold flex items-center gap-2">
          <Icon name="UserPlus" size={16} />
          Добавить клиента
        </button>
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className="flex-1 space-y-3">
          <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-3">
            <Icon name="Search" size={15} className="text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по имени, телефону, email..."
              className="bg-transparent text-sm flex-1 focus:outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            {filtered.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
                className={`w-full glass rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 text-left hover:-translate-y-0.5 animate-fade-in stagger-${Math.min(i + 1, 6)} ${
                  selected === c.id ? 'glass-gold border border-primary/20' : ''
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-montserrat font-bold text-sm ${
                  selected === c.id ? 'gradient-gold text-background' : 'glass text-primary'
                }`}>
                  {c.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-medium text-sm truncate">{c.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${typeColors[c.type]}`}>
                      {typeLabels[c.type]}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-3">
                    <span className="flex items-center gap-1"><Icon name="Phone" size={11} />{c.phone}</span>
                    <span className="flex items-center gap-1"><Icon name="Mail" size={11} />{c.email}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold">{c.total.toLocaleString('ru')} ₽</div>
                  <div className="text-xs text-muted-foreground">{c.docs} документов</div>
                </div>
                <div className="text-xs glass px-2 py-1 rounded-lg font-mono text-primary">{c.prefix}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        {selectedClient && (
          <div className="w-80 space-y-4 animate-slide-in-right">
            <div className="glass-gold rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 gradient-gold rounded-xl flex items-center justify-center font-montserrat font-bold text-background text-sm">
                  {selectedClient.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/8">
                    <Icon name="Pencil" size={13} className="text-muted-foreground" />
                  </button>
                  <button className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-red-500/10">
                    <Icon name="Trash2" size={13} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
              <h3 className="font-montserrat font-bold text-sm mb-1">{selectedClient.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[selectedClient.type]}`}>
                {typeLabels[selectedClient.type]}
              </span>
            </div>

            <div className="glass rounded-2xl p-5 space-y-3">
              <h4 className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Контакты</h4>
              {[
                { icon: 'Phone', val: selectedClient.phone },
                { icon: 'Mail', val: selectedClient.email },
                ...('inn' in selectedClient ? [{ icon: 'Hash', val: `ИНН: ${selectedClient.inn}` }] : []),
                ...('ogrn' in selectedClient ? [{ icon: 'Building2', val: `ОГРН: ${selectedClient.ogrn}` }] : []),
              ].filter(i => i.val).map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <Icon name={item.icon} size={14} className="text-primary shrink-0" fallback="Info" />
                  <span className="text-muted-foreground">{item.val}</span>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-5 space-y-3">
              <h4 className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Статистика</h4>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Документов</span>
                <span className="font-semibold">{selectedClient.docs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Сумма сделок</span>
                <span className="font-semibold gradient-text">{selectedClient.total.toLocaleString('ru')} ₽</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Префикс</span>
                <span className="font-mono text-primary font-bold">{selectedClient.prefix}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full btn-gold flex items-center justify-center gap-2 text-sm">
                <Icon name="FilePlus" size={15} />
                Создать документ
              </button>
              <button className="w-full btn-ghost flex items-center justify-center gap-2 text-sm">
                <Icon name="Receipt" size={15} />
                Выставить счёт
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="glass rounded-3xl p-8 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-montserrat font-bold text-xl">Новый клиент</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/8">
                <Icon name="X" size={15} className="text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                {['person', 'ip', 'company'].map(t => (
                  <button
                    key={t}
                    onClick={() => setNewType(t)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      newType === t ? 'gradient-gold text-background' : 'glass text-muted-foreground'
                    }`}
                  >
                    {typeLabels[t]}
                  </button>
                ))}
              </div>

              {newType === 'person' && (
                <div className="grid grid-cols-3 gap-3">
                  {['Фамилия', 'Имя', 'Отчество'].map(p => (
                    <div key={p}>
                      <label className="text-xs text-muted-foreground block mb-1">{p}</label>
                      <input placeholder={p} className="w-full bg-transparent border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" />
                    </div>
                  ))}
                </div>
              )}
              {(newType === 'ip' || newType === 'company') && (
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Наименование</label>
                  <input placeholder={newType === 'ip' ? 'ИП Иванов Иван Иванович' : 'ООО «Название»'} className="w-full bg-transparent border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" />
                </div>
              )}
              {(newType === 'ip' || newType === 'company') && (
                <div className="grid grid-cols-2 gap-3">
                  {['ИНН', newType === 'company' ? 'ОГРН' : ''].filter(Boolean).map(f => (
                    <div key={f}>
                      <label className="text-xs text-muted-foreground block mb-1">{f}</label>
                      <input placeholder={f} className="w-full bg-transparent border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" />
                    </div>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Телефон</label>
                  <input placeholder="+7 000 000-00-00" className="w-full bg-transparent border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Email</label>
                  <input placeholder="email@example.com" className="w-full bg-transparent border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="btn-ghost flex-1">Отмена</button>
              <button onClick={() => setShowForm(false)} className="btn-gold flex-1">Добавить клиента</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
