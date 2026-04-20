import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

interface LandingProps {
  onKnowledge: () => void;
  onLogin: () => void;
}

const features = [
  { icon: "FileSignature", text: "Договоры, счета и акты за минуты" },
  { icon: "Users", text: "База клиентов с личными данными" },
  { icon: "Receipt", text: "Учёт платежей и статусов оплаты" },
  { icon: "ShieldCheck", text: "Данные каждого пользователя защищены" },
];

export default function Landing({ onKnowledge, onLogin }: LandingProps) {
  const [visible, setVisible] = useState(false);
  const [floatY, setFloatY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      setFloatY(Math.sin(elapsed * 0.8) * 10);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-between bg-background overflow-hidden relative">
      {/* Фоновые пятна */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-amber-500/3 blur-[80px]" />
      </div>

      {/* Шапка */}
      <header className="w-full flex items-center justify-between px-6 pt-8 pb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 gradient-gold rounded-xl flex items-center justify-center glow-gold">
            <Icon name="FileSignature" size={18} className="text-background" />
          </div>
          <span className="font-montserrat font-black text-lg gradient-text">ДокуПро</span>
        </div>
        <button
          onClick={onLogin}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Войти
        </button>
      </header>

      {/* Центральный блок */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 text-center">
        {/* Иконка с анимацией парения */}
        <div
          className={`transition-all duration-1000 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          style={{ transform: `translateY(${floatY}px)` }}
        >
          <div className="w-24 h-24 gradient-gold rounded-3xl flex items-center justify-center glow-gold mx-auto mb-8 shadow-2xl">
            <Icon name="FileSignature" size={44} className="text-background" />
          </div>
        </div>

        {/* Заголовок */}
        <div className={`transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="font-montserrat font-black text-4xl sm:text-5xl leading-tight mb-3">
            Документы<br />
            <span className="gradient-text">без лишних слов</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-sm mx-auto leading-relaxed mb-8">
            Создавайте договоры, счета и акты в пару кликов. Ваши клиенты и данные — только ваши.
          </p>
        </div>

        {/* Фичи */}
        <div className={`transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} grid grid-cols-2 gap-3 max-w-sm w-full mb-10`}>
          {features.map((f, i) => (
            <div key={i} className="glass rounded-2xl p-3 flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 glass-gold rounded-xl flex items-center justify-center shrink-0">
                <Icon name={f.icon} size={15} className="text-primary" />
              </div>
              <span className="text-xs text-muted-foreground leading-snug">{f.text}</span>
            </div>
          ))}
        </div>

        {/* Кнопки */}
        <div className={`transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} flex flex-col sm:flex-row gap-3 w-full max-w-xs`}>
          <button
            onClick={onLogin}
            className="btn-gold flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-montserrat font-bold text-base shadow-lg"
          >
            <Icon name="LogIn" size={18} className="text-background" />
            <span className="text-background">Вход</span>
          </button>
          <button
            onClick={onKnowledge}
            className="flex-1 glass flex items-center justify-center gap-2 py-4 rounded-2xl font-montserrat font-semibold text-base hover:bg-white/8 transition-all duration-200 border border-white/10"
          >
            <Icon name="BookOpen" size={18} className="text-primary" />
            <span>Узнать больше</span>
          </button>
        </div>
      </main>

      {/* Подвал */}
      <footer className="w-full text-center pb-8 pt-4 relative z-10">
        <p className="text-xs text-muted-foreground/50">© 2026 ДокуПро · Документооборот для бизнеса</p>
      </footer>
    </div>
  );
}
