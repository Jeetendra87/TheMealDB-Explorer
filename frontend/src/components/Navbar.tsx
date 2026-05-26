import { Heart, Moon, Search, Soup, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { usePreferencesStore } from '@/store/preferencesStore';
import { cn } from '@/utils/cn';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-full px-4 py-2 text-sm font-semibold transition',
    isActive
      ? 'bg-brand-600 text-white'
      : 'text-slate-700 hover:bg-brand-100 dark:text-slate-200 dark:hover:bg-slate-800'
  );

export const Navbar = () => {
  const theme = usePreferencesStore((state) => state.theme);
  const toggleTheme = usePreferencesStore((state) => state.toggleTheme);
  const favoritesCount = usePreferencesStore((state) => state.favorites.length);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <NavLink to="/" className="inline-flex items-center gap-2 text-lg font-black tracking-tight">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white">
            <Soup className="h-5 w-5" />
          </span>
          TheMealDB Explorer
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          <NavLink to="/" className={navLinkClass} end>
            <Search className="mr-1 inline h-4 w-4" />
            Search
          </NavLink>
          <NavLink to="/categories" className={navLinkClass}>
            Categories
          </NavLink>
          <NavLink to="/favorites" className={navLinkClass}>
            <Heart className="mr-1 inline h-4 w-4" />
            Favorites
            {favoritesCount > 0 ? (
              <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">{favoritesCount}</span>
            ) : null}
          </NavLink>
        </nav>

        <button
          type="button"
          className="btn-secondary !px-3 !py-2"
          aria-label="Toggle color theme"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
};
