import { ExternalLink, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from './Badge';
import { FavoriteButton } from './FavoriteButton';
import type { MealDetails } from '@/types/meal';

interface RandomMealModalProps {
  meal: MealDetails | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
}

export const RandomMealModal = ({ meal, isOpen, isLoading, onClose }: RandomMealModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Random meal"
        className="surface-card relative max-h-[90vh] w-full max-w-4xl overflow-y-auto p-6 sm:p-8"
      >
        <button
          type="button"
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-full border border-brand-200 p-2 dark:border-slate-700"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="aspect-[4/3] animate-pulse rounded-3xl bg-brand-100 dark:bg-slate-800" />
            <div className="space-y-4">
              <div className="h-8 w-2/3 animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
              <div className="h-24 animate-pulse rounded bg-brand-100 dark:bg-slate-800" />
            </div>
          </div>
        ) : meal ? (
          <div className="grid gap-6 md:grid-cols-2">
            <img src={meal.thumbnail} alt={meal.name} className="aspect-[4/3] rounded-3xl object-cover" />
            <div>
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="text-3xl font-black">{meal.name}</h2>
                <FavoriteButton meal={meal} />
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {meal.category ? <Badge>{meal.category}</Badge> : null}
                {meal.area ? <Badge>{meal.area}</Badge> : null}
              </div>
              <p className="line-clamp-6 text-slate-600 dark:text-slate-300">{meal.instructions}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/meals/${meal.id}`} className="btn-primary" onClick={onClose}>
                  View full recipe
                </Link>
                {meal.source ? (
                  <a href={meal.source} target="_blank" rel="noreferrer" className="btn-secondary">
                    <ExternalLink className="h-4 w-4" />
                    Source
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-slate-600 dark:text-slate-300">No random meal available.</p>
        )}
      </div>
    </div>
  );
};
