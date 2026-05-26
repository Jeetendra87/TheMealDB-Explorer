import { Clock3 } from 'lucide-react';
import { usePreferencesStore } from '@/store/preferencesStore';

interface RecentSearchesProps {
  onSelect: (query: string) => void;
}

export const RecentSearches = ({ onSelect }: RecentSearchesProps) => {
  const recentSearches = usePreferencesStore((state) => state.recentSearches);
  const clearRecentSearches = usePreferencesStore((state) => state.clearRecentSearches);

  if (!recentSearches.length) return null;

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Clock3 className="h-4 w-4" />
          Recent searches
        </p>
        <button type="button" className="text-xs font-semibold text-brand-700" onClick={clearRecentSearches}>
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((query) => (
          <button
            key={query}
            type="button"
            className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-sm font-medium transition hover:bg-brand-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
            onClick={() => onSelect(query)}
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  );
};
