import { Link } from 'react-router-dom';
import type { Category } from '@/types/meal';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => (
  <Link
    to={`/categories/${encodeURIComponent(category.name)}`}
    className="group surface-card animate-fade-in overflow-hidden p-4 transition hover:-translate-y-1"
  >
    <div className="mb-4 overflow-hidden rounded-2xl">
      <img
        src={category.thumbnail}
        alt={category.name}
        loading="lazy"
        className="h-32 w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <h3 className="text-lg font-bold">{category.name}</h3>
    <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{category.description}</p>
  </Link>
);
