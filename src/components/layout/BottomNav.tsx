import { Home, Camera, Clock, BookOpen, Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, labelKey: 'nav.home' },
  { to: '/history', icon: Clock, labelKey: 'nav.history' },
  { to: '/scan', icon: Camera, labelKey: 'nav.scan', isMain: true },
  { to: '/diseases', icon: BookOpen, labelKey: 'nav.diseases' },
];

export function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-6 left-4 right-4 z-50 glass rounded-2xl shadow-2xl border border-white/20 max-w-lg mx-auto overflow-hidden">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1.5 px-3 py-1 rounded-xl transition-all duration-300 relative",
                item.isMain
                  ? "scale-110"
                  : isActive
                  ? "text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              )
            }
          >
            {({ isActive }) => (
              <>
                {item.isMain ? (
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40 rotate-45 transition-transform active:scale-95">
                    <item.icon className="w-6 h-6 text-primary-foreground -rotate-45" />
                  </div>
                ) : (
                  <div className="relative">
                    <item.icon className={cn("w-5 h-5 transition-transform", isActive && "stroke-[2.5px]")} />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                )}
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider transition-opacity",
                  item.isMain ? "hidden" : isActive ? "opacity-100" : "opacity-60"
                )}>
                  {t(item.labelKey)}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
