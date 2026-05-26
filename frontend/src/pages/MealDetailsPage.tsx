import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/Badge';
import { ErrorState } from '@/components/ErrorState';
import { FavoriteButton } from '@/components/FavoriteButton';
import { PageMeta } from '@/components/PageMeta';
import { MealCardSkeleton } from '@/components/skeletons/MealCardSkeleton';
import { getMealById, handleApiError } from '@/services/api';
import type { MealDetails } from '@/types/meal';

export const MealDetailsPage = () => {
  const { id = '' } = useParams();
  const [meal, setMeal] = useState<MealDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMeal = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getMealById(id);
      setMeal(data);
    } catch (loadError) {
      setError(handleApiError(loadError));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadMeal();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container-shell py-10">
        <MealCardSkeleton />
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="container-shell py-10">
        <ErrorState message={error || 'Meal not found.'} onRetry={() => void loadMeal()} />
      </div>
    );
  }

  return (
    <>
      <PageMeta title={meal.name} />
      <section className="container-shell py-10">
        <article className="surface-card overflow-hidden">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <img src={meal.thumbnail} alt={meal.name} className="h-full min-h-[320px] w-full object-cover" />
            <div className="space-y-5 p-6 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Recipe details</p>
                  <h1 className="mt-2 text-4xl font-black">{meal.name}</h1>
                </div>
                <FavoriteButton meal={meal} />
              </div>

              <div className="flex flex-wrap gap-2">
                {meal.category ? <Badge>{meal.category}</Badge> : null}
                {meal.area ? <Badge>{meal.area}</Badge> : null}
                {meal.tags.map((tag) => (
                  <Badge key={tag} className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div>
                <h2 className="text-xl font-bold">Ingredients</h2>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {meal.ingredients.map((ingredient) => (
                    <li
                      key={ingredient.name}
                      className="rounded-2xl border border-brand-200/80 bg-brand-50/70 p-3 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <p className="font-semibold">{ingredient.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{ingredient.measure || 'to taste'}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold">Instructions</h2>
                <p className="mt-3 whitespace-pre-line text-slate-700 dark:text-slate-200">{meal.instructions}</p>
              </div>

              {meal.youtubeEmbed ? (
                <div>
                  <h2 className="text-xl font-bold">Video tutorial</h2>
                  <iframe
                    title={`${meal.name} video`}
                    src={meal.youtubeEmbed}
                    className="mt-3 aspect-video w-full rounded-3xl border-0"
                    allowFullScreen
                  />
                </div>
              ) : null}

              {meal.source ? (
                <a href={meal.source} target="_blank" rel="noreferrer" className="btn-secondary inline-flex">
                  <ExternalLink className="h-4 w-4" />
                  View original source
                </a>
              ) : null}
            </div>
          </div>
        </article>
      </section>
    </>
  );
};
