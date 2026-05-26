import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MealSummary } from '@/types/meal';

type Theme = 'light' | 'dark';

interface PreferencesState {
  theme: Theme;
  favorites: MealSummary[];
  recentSearches: string[];
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  toggleFavorite: (meal: MealSummary) => void;
  isFavorite: (id: string) => boolean;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

const applyThemeClass = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      favorites: [],
      recentSearches: [],
      toggleTheme: () => {
        const nextTheme = get().theme === 'light' ? 'dark' : 'light';
        applyThemeClass(nextTheme);
        set({ theme: nextTheme });
      },
      setTheme: (theme) => {
        applyThemeClass(theme);
        set({ theme });
      },
      toggleFavorite: (meal) => {
        const exists = get().favorites.some((favorite) => favorite.id === meal.id);
        set({
          favorites: exists
            ? get().favorites.filter((favorite) => favorite.id !== meal.id)
            : [meal, ...get().favorites]
        });
      },
      isFavorite: (id) => get().favorites.some((favorite) => favorite.id === id),
      addRecentSearch: (query) => {
        const normalized = query.trim();
        if (!normalized) return;

        const next = [normalized, ...get().recentSearches.filter((item) => item !== normalized)].slice(0, 8);
        set({ recentSearches: next });
      },
      clearRecentSearches: () => set({ recentSearches: [] })
    }),
    {
      name: 'themealdb-preferences',
      partialize: (state) => ({
        theme: state.theme,
        favorites: state.favorites,
        recentSearches: state.recentSearches
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          applyThemeClass(state.theme);
        }
      }
    }
  )
);
