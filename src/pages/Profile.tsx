import { useState } from 'react';
import Icon from '@/components/ui/icon';

const services = [
  { id: '1', name: 'Консультация', price: 5000, unit: 'час' },
  { id: '2', name: 'Разработка сайта', price: 50000, unit: 'проект' },
  { id: '3', name: 'SEO-продвижение', price: 15000, unit: 'месяц' },
  { id: '4', name: 'Ведение соцсетей', price: 20000, unit: 'месяц' },
];

export default function Profile() {
  const [activeSection, setActiveSection] = useState('profile');
  const [editMode, setEditMode] = useState(false);

  const sections = [
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'nomenclature', label: 'Номенклатура', icon: 'Package' },
    { id: 'requisites', label: 'Реквизиты', icon: 'Building2' },
    { id: 'notifications', label: 'Уведомления', icon: 'Bell' },
    { id: 'security', label: 'Безопасность', icon: 'ShieldCheck' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-montserrat font-bold mb-1">Настройки профиля</h1>
        <p className="text-muted-foreground text-sm">Управление аккаунтом и справочниками</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Nav */}
        <div className="w-56 shrink-0 space-y-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`nav-item w-full ${activeSection === s.id ? 'active' : ''}`}
            >
              <Icon name={s.icon} size={17} fallback="User" />
              <span className="text-sm">{s.label}</span>
            </button>
          ))}
          <div className="pt-4 border-t border-white/5 mt-4">
            <button className="nav-item w-full text-red-400 hover:text-red-300">
              <Icon name="LogOut" size={17} />
              <span className="text-sm">Выйти</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {activeSection === 'profile' && (
            <div className="space-y-4 animate-fade-in">
              {/* Avatar + Name */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 gradient-gold rounded-2xl flex items-center justify-center font-montserrat font-bold text-2xl text-background shrink-0 glow-gold">
                    ИИ
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="font-montserrat font-bold text-xl">Иванов Иван Владимирович</h2>
                      <span className="badge-status badge-paid">
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        Активен
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">ИП · Зарегистрирован 01.01.2024</p>
                    <div className="flex gap-2">
                      <button onClick={() => setEditMode(!editMode)} className="btn-gold text-sm py-2 px-4 flex items-center gap-2">
                        <Icon name="Pencil" size={13} />
                        {editMode ? 'Сохранить' : 'Редактировать'}
                      </button>
                      <button className="btn-ghost text-sm py-2 px-4">Изменить фото</button>
                    </div>
                  </div>
                  <div className="glass-gold rounded-xl px-4 py-3 text-center">
                    <div className="text-xs text-muted-foreground mb-0.5">Префикс документов</div>
                    <div className="text-2xl font-montserrat font-black gradient-text">ИВА</div>
                    <div className="text-xs text-muted-foreground">Порядк. №: 001</div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 space-y-4">
                <h3 className="font-montserrat font-semibold">Личные данные</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Фамилия', val: 'Иванов' },
                    { label: 'Имя', val: 'Иван' },
                    { label: 'Отчество', val: 'Владимирович' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="text-xs text-muted-foreground block mb-1.5">{f.label}</label>
                      <input
                        defaultValue={f.val}
                        disabled={!editMode}
                        className="w-full bg-transparent border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50 disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Телефон', val: '+7 900 123-45-67', icon: 'Phone' },
                    { label: 'Email', val: 'ivan@example.com', icon: 'Mail' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="text-xs text-muted-foreground block mb-1.5">{f.label}</label>
                      <div className="flex items-center gap-2 border border-white/10 rounded-xl px-3 py-2.5">
                        <Icon name={f.icon} size={14} className="text-primary shrink-0" />
                        <input
                          defaultValue={f.val}
                          disabled={!editMode}
                          className="bg-transparent text-sm flex-1 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'nomenclature' && (
            <div className="space-y-4 animate-fade-in">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-montserrat font-semibold">Справочник услуг</h3>
                  <button className="btn-gold text-sm py-2 flex items-center gap-1.5">
                    <Icon name="Plus" size={14} />
                    Добавить услугу
                  </button>
                </div>
                <div className="space-y-2">
                  {services.map((s, i) => (
                    <div key={i} className="glass rounded-xl p-4 flex items-center gap-4">
                      <div className="glass-gold w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
                        <Icon name="Package" size={15} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{s.name}</div>
                        <div className="text-xs text-muted-foreground">за {s.unit}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm gradient-text">{s.price.toLocaleString('ru')} ₽</div>
                        <div className="text-xs text-muted-foreground">текущая цена</div>
                      </div>
                      <div className="flex gap-1.5">
                        <button className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/8">
                          <Icon name="Pencil" size={13} className="text-muted-foreground" />
                        </button>
                        <button className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-red-500/10">
                          <Icon name="Trash2" size={13} className="text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-gold rounded-2xl p-5 flex items-start gap-4">
                <Icon name="Info" size={18} className="text-primary mt-0.5 shrink-0" />
                <div className="text-sm text-muted-foreground leading-relaxed">
                  Цены в справочнике используются как значения по умолчанию при создании документов.
                  Вы всегда можете изменить цену прямо в конструкторе для конкретного документа.
                </div>
              </div>
            </div>
          )}

          {activeSection === 'requisites' && (
            <div className="glass rounded-2xl p-6 space-y-5 animate-fade-in">
              <h3 className="font-montserrat font-semibold">Реквизиты для платёжных документов</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'ИНН', val: '771234567890' },
                  { label: 'ОГРНИП', val: '312770000123456' },
                  { label: 'Банк', val: 'ПАО «Сбербанк»' },
                  { label: 'БИК', val: '044525225' },
                  { label: 'Расчётный счёт', val: '40802810000000001234' },
                  { label: 'Корр. счёт', val: '30101810400000000225' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs text-muted-foreground block mb-1.5">{f.label}</label>
                    <input
                      defaultValue={f.val}
                      className="w-full bg-transparent border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50 font-mono"
                    />
                  </div>
                ))}
              </div>
              <button className="btn-gold flex items-center gap-2">
                <Icon name="Save" size={15} />
                Сохранить реквизиты
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="glass rounded-2xl p-6 space-y-4 animate-fade-in">
              <h3 className="font-montserrat font-semibold">Уведомления</h3>
              {[
                { label: 'Оплата счёта', desc: 'При поступлении оплаты от клиента', on: true },
                { label: 'Подписание документа', desc: 'Когда клиент подпишет документ', on: true },
                { label: 'Напоминание об оплате', desc: 'За 3 дня до истечения срока', on: false },
                { label: 'Новые шаблоны', desc: 'Добавление новых шаблонов в библиотеку', on: false },
              ].map((n, i) => (
                <div key={i} className="glass rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{n.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{n.desc}</div>
                  </div>
                  <button className={`w-12 h-6 rounded-full transition-all duration-200 relative ${n.on ? 'gradient-gold' : 'bg-white/10'}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-200 ${n.on ? 'right-1 bg-background' : 'left-1 bg-white/40'}`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-4 animate-fade-in">
              <div className="glass rounded-2xl p-6 space-y-4">
                <h3 className="font-montserrat font-semibold">Безопасность</h3>
                <div className="glass-gold rounded-xl p-4 flex items-center gap-3">
                  <Icon name="ShieldCheck" size={20} className="text-primary" />
                  <div>
                    <div className="font-medium text-sm">Двухфакторная аутентификация</div>
                    <div className="text-xs text-muted-foreground">Подтверждение входа через SMS</div>
                  </div>
                  <button className="btn-gold text-sm py-2 px-4 ml-auto">Включена</button>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1.5">Текущий пароль</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-transparent border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1.5">Новый пароль</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-transparent border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1.5">Подтверждение</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-transparent border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50" />
                  </div>
                </div>
                <button className="btn-gold flex items-center gap-2">
                  <Icon name="Lock" size={15} />
                  Сменить пароль
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
