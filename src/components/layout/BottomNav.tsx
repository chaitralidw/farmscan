import { Home, Camera, Clock, BookOpen, Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, labelKey: 'nav.home' },
  { to: '/history', icon: Clock, labelKey: 'nav.history' },
  { to: '/scan', icon: Camera, labelKey: 'nav.scan', isMain: true },
  { to: '/diseases', icon: BookOpen, labelKey: 'nav.diseases' },
  { to: '/alerts', icon: Bell, labelKey: 'nav.alerts' },
];

export function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-lg">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
                item.isMain
                  ? "relative -mt-6"
                  : isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                {item.isMain ? (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center shadow-lg shadow-primary/30">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                ) : (
                  <item.icon className={cn("w-5 h-5", isActive && "animate-pulse-gentle")} />
                )}
                <span className={cn(
                  "text-xs font-medium",
                  item.isMain && "mt-1"
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
