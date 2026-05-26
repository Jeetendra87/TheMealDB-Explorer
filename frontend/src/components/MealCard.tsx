import { Link } from 'react-router-dom';
import { FavoriteButton } from './FavoriteButton';
import { Badge } from './Badge';
import type { MealSummary } from '@/types/meal';

interface MealCardProps {
  meal: MealSummary;
}

export const MealCard = ({ meal }: MealCardProps) => (
  <article className="group surface-card animate-fade-in overflow-hidden transition duration-300 hover:-translate-y-1">
    <Link to={`/meals/${meal.id}`} className="block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={meal.thumbnail}
          alt={meal.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          <FavoriteButton meal={meal} />
        </div>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="text-lg font-bold leading-tight">{meal.name}</h3>
        <div className="flex flex-wrap gap-2">
          {meal.category ? <Badge>{meal.category}</Badge> : null}
          {meal.area ? <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{meal.area}</Badge> : null}
        </div>
      </div>
    </Link>
  </article>
);
