import { useState } from "react";
import Icon from "@/components/ui/icon";

interface AuthProps {
  onBack: () => void;
  onSuccess: () => void;
}

type Mode = "login" | "register" | "forgot";

export default function Auth({ onBack, onSuccess }: AuthProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validatePhone = (v: string) => /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(v.replace(/\s/g, ""));
  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = () => {
    const errs: Record<string, string> = {};

    if (mode === "register") {
      if (!form.phone) errs.phone = "Введите номер телефона";
      else if (!validatePhone(form.phone)) errs.phone = "Некорректный номер телефона";
      if (!form.email) errs.email = "Введите email";
      else if (!validateEmail(form.email)) errs.email = "Некорректный email";
      if (!form.password) errs.password = "Введите пароль";
      else if (form.password.length < 6) errs.password = "Минимум 6 символов";
      if (form.password !== form.confirmPassword) errs.confirmPassword = "Пароли не совпадают";
    }

    if (mode === "login") {
      if (!form.email && !form.phone) errs.email = "Введите email или телефон";
      if (!form.password) errs.password = "Введите пароль";
    }

    if (mode === "forgot") {
      if (!form.phone) errs.phone = "Введите номер телефона";
      else if (!validatePhone(form.phone)) errs.phone = "Некорректный номер телефона";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    onSuccess();
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* Фоновые пятна */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[350px] h-[350px] rounded-full bg-amber-500/5 blur-[80px]" />
        <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]" />
      </div>

      {/* Шапка */}
      <header className="flex items-center gap-3 px-4 pt-8 pb-4 relative z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-white/8 transition-colors"
        >
          <Icon name="ArrowLeft" size={16} className="text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 gradient-gold rounded-xl flex items-center justify-center glow-gold">
            <Icon name="FileSignature" size={15} className="text-background" />
          </div>
          <span className="font-montserrat font-black text-base gradient-text">ДокуПро</span>
        </div>
      </header>

      {/* Форма */}
      <div className="flex-1 flex flex-col justify-center px-5 pb-8 relative z-10">
        <div className="max-w-sm w-full mx-auto">
          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="font-montserrat font-black text-3xl mb-2">
              {mode === "login" && <><span className="gradient-text">Добро</span> пожаловать</>}
              {mode === "register" && <>Создать <span className="gradient-text">аккаунт</span></>}
              {mode === "forgot" && <>Восстановить <span className="gradient-text">пароль</span></>}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === "login" && "Войдите, чтобы продолжить работу"}
              {mode === "register" && "Заполните данные для регистрации"}
              {mode === "forgot" && "Введите телефон — пришлём SMS с кодом"}
            </p>
          </div>

          {/* Поля */}
          <div className="space-y-3">
            {/* ФИО — только при регистрации */}
            {mode === "register" && (
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  ФИО <span className="text-muted-foreground/50">(необязательно)</span>
                </label>
                <div className="relative">
                  <Icon name="User" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Иванов Иван Иванович"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="w-full glass rounded-xl pl-9 pr-4 py-3.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary/40"
                  />
                </div>
              </div>
            )}

            {/* Телефон */}
            {(mode === "register" || mode === "forgot") && (
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Номер телефона <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <Icon name="Phone" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={`w-full glass rounded-xl pl-9 pr-4 py-3.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary/40 ${errors.phone ? "ring-1 ring-red-500/50" : ""}`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>
            )}

            {/* Email / логин */}
            {(mode === "login" || mode === "register") && (
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  {mode === "login" ? "Email или телефон" : "Email"}
                  {mode === "register" && <span className="text-primary"> *</span>}
                </label>
                <div className="relative">
                  <Icon name="Mail" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={mode === "login" ? "text" : "email"}
                    placeholder={mode === "login" ? "email@example.com или +7..." : "email@example.com"}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={`w-full glass rounded-xl pl-9 pr-4 py-3.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary/40 ${errors.email ? "ring-1 ring-red-500/50" : ""}`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
            )}

            {/* Пароль */}
            {(mode === "login" || mode === "register") && (
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Пароль <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <Icon name="Lock" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Минимум 6 символов"
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    className={`w-full glass rounded-xl pl-9 pr-10 py-3.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary/40 ${errors.password ? "ring-1 ring-red-500/50" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name={showPassword ? "EyeOff" : "Eye"} size={15} />
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
              </div>
            )}

            {/* Подтверждение пароля */}
            {mode === "register" && (
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Повторите пароль <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <Icon name="LockKeyhole" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Повторите пароль"
                    value={form.confirmPassword}
                    onChange={(e) => set("confirmPassword", e.target.value)}
                    className={`w-full glass rounded-xl pl-9 pr-4 py-3.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary/40 ${errors.confirmPassword ? "ring-1 ring-red-500/50" : ""}`}
                  />
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>}
              </div>
            )}
          </div>

          {/* Забыл пароль */}
          {mode === "login" && (
            <div className="text-right mt-2">
              <button
                onClick={() => setMode("forgot")}
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Забыли пароль?
              </button>
            </div>
          )}

          {/* Кнопка действия */}
          <button
            onClick={handleSubmit}
            className="btn-gold w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-montserrat font-bold text-base mt-6 shadow-lg"
          >
            <Icon
              name={mode === "login" ? "LogIn" : mode === "register" ? "UserPlus" : "Send"}
              size={18}
              className="text-background"
            />
            <span className="text-background">
              {mode === "login" && "Войти"}
              {mode === "register" && "Создать аккаунт"}
              {mode === "forgot" && "Отправить SMS"}
            </span>
          </button>

          {/* SMS-пояснение для регистрации */}
          {mode === "register" && (
            <div className="glass rounded-xl p-3 mt-4 flex items-start gap-2.5">
              <Icon name="MessageCircle" size={14} className="text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                После регистрации на ваш номер придёт SMS для подтверждения. SMS также используется при входе с нового устройства.
              </p>
            </div>
          )}

          {/* Переключатель режима */}
          <div className="text-center mt-6">
            {mode === "login" && (
              <p className="text-sm text-muted-foreground">
                Нет аккаунта?{" "}
                <button onClick={() => setMode("register")} className="text-primary hover:underline font-medium">
                  Зарегистрироваться
                </button>
              </p>
            )}
            {mode === "register" && (
              <p className="text-sm text-muted-foreground">
                Уже есть аккаунт?{" "}
                <button onClick={() => setMode("login")} className="text-primary hover:underline font-medium">
                  Войти
                </button>
              </p>
            )}
            {mode === "forgot" && (
              <button onClick={() => setMode("login")} className="text-sm text-primary hover:underline">
                ← Вернуться ко входу
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}