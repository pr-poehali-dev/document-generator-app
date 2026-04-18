import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Icon from "@/components/ui/icon";
import Dashboard from "./pages/Dashboard";
import Constructor from "./pages/Constructor";
import Templates from "./pages/Templates";
import Documents from "./pages/Documents";
import Clients from "./pages/Clients";
import Bank from "./pages/Bank";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const navItems = [
  { id: "dashboard", label: "Главная", icon: "LayoutDashboard" },
  { id: "constructor", label: "Конструктор", icon: "FilePlus" },
  { id: "templates", label: "Шаблоны", icon: "Library" },
  { id: "documents", label: "Документы", icon: "Files" },
  { id: "clients", label: "Клиенты", icon: "Users" },
  { id: "bank", label: "Банк и касса", icon: "Landmark" },
];

const pageMap: Record<string, React.ReactNode> = {
  dashboard: <Dashboard />,
  constructor: <Constructor />,
  templates: <Templates />,
  documents: <Documents />,
  clients: <Clients />,
  bank: <Bank />,
  profile: <Profile />,
};

function AppLayout() {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`flex flex-col shrink-0 transition-all duration-300 border-r border-white/5 ${
          collapsed ? "w-16" : "w-60"
        }`}
        style={{ background: "hsl(var(--sidebar-background))" }}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/5 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 gradient-gold rounded-xl flex items-center justify-center shrink-0 glow-gold">
            <Icon name="FileSignature" size={18} className="text-background" />
          </div>
          {!collapsed && (
            <div>
              <div className="font-montserrat font-black text-sm gradient-text leading-tight">ДокуПро</div>
              <div className="text-xs text-muted-foreground leading-tight">Документы и платежи</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`nav-item w-full ${page === item.id ? "active" : ""} ${collapsed ? "justify-center px-2" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon name={item.icon} size={18} fallback="Circle" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
              {!collapsed && page === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-2 py-4 border-t border-white/5 space-y-1">
          <button
            onClick={() => setPage("profile")}
            className={`nav-item w-full ${page === "profile" ? "active" : ""} ${collapsed ? "justify-center px-2" : ""}`}
          >
            <div className={`w-7 h-7 gradient-gold rounded-lg flex items-center justify-center shrink-0 text-xs font-montserrat font-bold text-background`}>
              ИИ
            </div>
            {!collapsed && (
              <div className="flex-1 text-left">
                <div className="text-sm font-medium leading-tight">Иванов И.В.</div>
                <div className="text-xs text-muted-foreground leading-tight">ИП · Профиль</div>
              </div>
            )}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`nav-item w-full ${collapsed ? "justify-center px-2" : ""}`}
          >
            <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            {!collapsed && <span className="text-xs text-muted-foreground">Свернуть</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="shrink-0 h-14 border-b border-white/5 flex items-center justify-between px-6"
          style={{ background: "hsl(var(--sidebar-background))" }}>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>ДокуПро</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground font-medium">
              {[...navItems, { id: "profile", label: "Профиль", icon: "User" }].find(n => n.id === page)?.label}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-white/8 transition-colors relative">
              <Icon name="Bell" size={16} className="text-muted-foreground" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <button className="w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-white/8 transition-colors">
              <Icon name="Search" size={16} className="text-muted-foreground" />
            </button>
            <button className="btn-gold text-sm py-2 px-4 flex items-center gap-2">
              <Icon name="Plus" size={14} />
              Создать
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div key={page} className="animate-fade-in">
            {pageMap[page]}
          </div>
        </div>
      </main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppLayout />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
