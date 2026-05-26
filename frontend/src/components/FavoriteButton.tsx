import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { usePreferencesStore } from '@/store/preferencesStore';
import type { MealSummary } from '@/types/meal';
import { cn } from '@/utils/cn';

interface FavoriteButtonProps {
  meal: MealSummary;
  className?: string;
}

export const FavoriteButton = ({ meal, className }: FavoriteButtonProps) => {
  const toggleFavorite = usePreferencesStore((state) => state.toggleFavorite);
  const active = usePreferencesStore((state) => state.isFavorite(meal.id));

  return (
    <button
      type="button"
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition hover:scale-105 dark:border-slate-700 dark:bg-slate-900',
        active && 'border-red-300 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-300',
        className
      )}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(meal);
        toast.success(active ? 'Removed from favorites' : 'Saved to favorites');
      }}
    >
      <Heart className={cn('h-4 w-4', active && 'fill-current')} />
    </button>
  );
};
