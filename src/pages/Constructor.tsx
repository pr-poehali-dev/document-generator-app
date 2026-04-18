import { useState } from 'react';
import Icon from '@/components/ui/icon';

const docTypes = [
  { id: 'contract', label: 'Договор', icon: 'FileText', desc: 'Договор оказания услуг' },
  { id: 'invoice', label: 'Счёт', icon: 'Receipt', desc: 'Счёт на оплату' },
  { id: 'act', label: 'Акт', icon: 'ClipboardCheck', desc: 'Акт выполненных работ' },
];

const clients = [
  { id: '1', name: 'Иванов Александр Владимирович', type: 'person', phone: '+7 900 123-45-67', email: 'ivanov@mail.ru' },
  { id: '2', name: 'ООО «Петров и партнёры»', type: 'company', inn: '7712345678', ogrn: '1027700123456' },
  { id: '3', name: 'ИП Сидорова Мария Константиновна', type: 'ip', inn: '771234567890' },
];

const services = [
  { id: '1', name: 'Консультация', price: 5000 },
  { id: '2', name: 'Разработка сайта', price: 50000 },
  { id: '3', name: 'SEO-продвижение', price: 15000 },
  { id: '4', name: 'Ведение соцсетей', price: 20000 },
];

interface LineItem {
  serviceId: string;
  name: string;
  qty: number;
  price: number;
}

export default function Constructor() {
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState('contract');
  const [selectedClient, setSelectedClient] = useState('');
  const [items, setItems] = useState<LineItem[]>([
    { serviceId: '1', name: 'Консультация', qty: 1, price: 5000 },
  ]);

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const addItem = () => {
    setItems([...items, { serviceId: '', name: '', qty: 1, price: 0 }]);
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, field: keyof LineItem, value: string | number) => {
    const updated = [...items];
    if (field === 'serviceId') {
      const svc = services.find(s => s.id === value);
      if (svc) {
        updated[idx] = { ...updated[idx], serviceId: String(value), name: svc.name, price: svc.price };
      }
    } else {
      (updated[idx] as Record<string, string | number>)[field] = value;
    }
    setItems(updated);
  };

  const steps = ['Тип документа', 'Клиент', 'Услуги', 'Подпись'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-montserrat font-bold mb-1">Конструктор документов</h1>
        <p className="text-muted-foreground text-sm">Создайте документ в несколько шагов</p>
      </div>

      {/* Stepper */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-0">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => setStep(i + 1)}
                className="flex items-center gap-2 group"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                  step > i + 1
                    ? 'gradient-gold text-background'
                    : step === i + 1
                    ? 'glass-gold text-primary border border-primary/30'
                    : 'glass text-muted-foreground'
                }`}>
                  {step > i + 1 ? <Icon name="Check" size={14} /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? 'text-primary' : 'text-muted-foreground'}`}>{s}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${step > i + 1 ? 'bg-primary/40' : 'bg-white/8'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="col-span-2 space-y-4">
          {step === 1 && (
            <div className="glass rounded-2xl p-6 space-y-4 animate-fade-in">
              <h2 className="font-montserrat font-semibold">Выберите тип документа</h2>
              <div className="grid grid-cols-3 gap-3">
                {docTypes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setDocType(t.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                      docType === t.id
                        ? 'glass-gold border-primary/30 text-primary'
                        : 'glass border-transparent hover:border-white/10'
                    }`}
                  >
                    <Icon name={t.icon} size={24} className={docType === t.id ? 'text-primary mb-3' : 'text-muted-foreground mb-3'} />
                    <div className="font-semibold text-sm">{t.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="btn-gold mt-2">
                Далее →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="glass rounded-2xl p-6 space-y-4 animate-fade-in">
              <h2 className="font-montserrat font-semibold">Выберите клиента</h2>
              <div className="space-y-2">
                {clients.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClient(c.id)}
                    className={`w-full p-4 rounded-xl border transition-all duration-200 text-left flex items-center gap-3 ${
                      selectedClient === c.id
                        ? 'glass-gold border-primary/30'
                        : 'glass border-transparent hover:border-white/10'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      selectedClient === c.id ? 'gradient-gold' : 'bg-white/8'
                    }`}>
                      <Icon name={c.type === 'person' ? 'User' : 'Building2'} size={16}
                        className={selectedClient === c.id ? 'text-background' : 'text-muted-foreground'} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{c.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.type === 'person' ? `${c.phone} · ${c.email}` : `ИНН: ${c.inn}`}
                      </div>
                    </div>
                    {selectedClient === c.id && (
                      <Icon name="CheckCircle" size={18} className="text-primary ml-auto" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="btn-ghost">← Назад</button>
                <button onClick={() => setStep(3)} className="btn-gold" disabled={!selectedClient}>
                  Далее →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="glass rounded-2xl p-6 space-y-4 animate-fade-in">
              <h2 className="font-montserrat font-semibold">Услуги и стоимость</h2>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i} className="glass rounded-xl p-4 flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground mb-1 block">Услуга</label>
                      <select
                        value={item.serviceId}
                        onChange={e => updateItem(i, 'serviceId', e.target.value)}
                        className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                      >
                        <option value="">— выберите —</option>
                        {services.map(s => (
                          <option key={s.id} value={s.id} className="bg-[hsl(220_25%_10%)]">{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-20">
                      <label className="text-xs text-muted-foreground mb-1 block">Кол-во</label>
                      <input
                        type="number"
                        value={item.qty}
                        min={1}
                        onChange={e => updateItem(i, 'qty', Number(e.target.value))}
                        className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="w-32">
                      <label className="text-xs text-muted-foreground mb-1 block">Цена, ₽</label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={e => updateItem(i, 'price', Number(e.target.value))}
                        className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="w-28 text-right">
                      <label className="text-xs text-muted-foreground mb-1 block">Сумма</label>
                      <div className="font-semibold text-sm py-2">
                        {(item.qty * item.price).toLocaleString('ru')} ₽
                      </div>
                    </div>
                    <button onClick={() => removeItem(i)} className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-red-500/10 mt-4 transition-colors">
                      <Icon name="X" size={13} className="text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addItem} className="btn-ghost flex items-center gap-2 text-sm">
                <Icon name="Plus" size={14} />
                Добавить услугу
              </button>
              <div className="flex items-center justify-between pt-2 border-t border-white/8">
                <div className="text-muted-foreground text-sm">Итого:</div>
                <div className="text-xl font-montserrat font-bold gradient-text">
                  {total.toLocaleString('ru')} ₽
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-ghost">← Назад</button>
                <button onClick={() => setStep(4)} className="btn-gold">Далее →</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="glass rounded-2xl p-6 space-y-4 animate-fade-in">
              <h2 className="font-montserrat font-semibold">Подписание ПЭП</h2>
              <div className="glass-gold rounded-xl p-4 flex items-start gap-3">
                <Icon name="ShieldCheck" size={20} className="text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Простая электронная подпись</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Документ будет отправлен клиенту на подпись. Подписание осуществляется через SMS-код или email.
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1.5">Способ подписания</label>
                  <div className="flex gap-2">
                    {['SMS-код', 'Email-код', 'Личная подпись'].map(m => (
                      <button key={m} className="glass-gold border border-primary/20 px-4 py-2 rounded-xl text-sm font-medium text-primary first:opacity-100 opacity-50 hover:opacity-80 transition-opacity">
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1.5">Комментарий к документу</label>
                  <textarea
                    rows={3}
                    placeholder="Дополнительные условия..."
                    className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="btn-ghost">← Назад</button>
                <button className="btn-gold flex items-center gap-2">
                  <Icon name="Send" size={16} />
                  Создать и отправить
                </button>
                <button className="btn-ghost flex items-center gap-2">
                  <Icon name="Save" size={16} />
                  Сохранить черновик
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <h3 className="font-montserrat font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Предпросмотр</h3>
            <div className="bg-white/5 rounded-xl p-4 space-y-3 min-h-64">
              <div className="text-center border-b border-white/10 pb-3">
                <div className="font-montserrat font-bold text-sm">
                  {docTypes.find(t => t.id === docType)?.label.toUpperCase()}
                </div>
                <div className="text-xs text-primary font-semibold">№ ИВА-003</div>
                <div className="text-xs text-muted-foreground">от 18 апреля 2026 г.</div>
              </div>
              {selectedClient && (
                <div className="text-xs space-y-1">
                  <div className="text-muted-foreground">Клиент:</div>
                  <div className="font-medium">{clients.find(c => c.id === selectedClient)?.name}</div>
                </div>
              )}
              {items.length > 0 && (
                <div className="text-xs space-y-1">
                  <div className="text-muted-foreground mb-1">Услуги:</div>
                  {items.map((item, i) => item.name && (
                    <div key={i} className="flex justify-between">
                      <span>{item.name} × {item.qty}</span>
                      <span className="text-primary">{(item.qty * item.price).toLocaleString('ru')} ₽</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold pt-1 border-t border-white/10">
                    <span>ИТОГО</span>
                    <span className="gradient-text">{total.toLocaleString('ru')} ₽</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="font-montserrat font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">Экспорт</h3>
            <div className="space-y-2">
              {[{ fmt: 'PDF', icon: 'FileDown' }, { fmt: 'Word', icon: 'FileText' }, { fmt: 'Excel', icon: 'Table' }].map(e => (
                <button key={e.fmt} className="w-full btn-ghost flex items-center gap-2 py-2.5 text-sm">
                  <Icon name={e.icon} size={15} className="text-primary" />
                  Скачать {e.fmt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
