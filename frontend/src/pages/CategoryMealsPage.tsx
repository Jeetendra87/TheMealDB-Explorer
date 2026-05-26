import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Hero } from '@/components/Hero';
import { MealCard } from '@/components/MealCard';
import { PageMeta } from '@/components/PageMeta';
import { MealCardSkeleton } from '@/components/skeletons/MealCardSkeleton';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getMealsByCategory, handleApiError } from '@/services/api';
import type { MealSummary } from '@/types/meal';
import { paginate } from '@/utils/pagination';

const PAGE_SIZE = 12;

export const CategoryMealsPage = () => {
  const { name = '' } = useParams();
  const decodedName = decodeURIComponent(name);
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMeals = useCallback(async () => {
    if (!decodedName) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getMealsByCategory(decodedName);
      setMeals(data);
      setVisibleCount(PAGE_SIZE);
    } catch (loadError) {
      setError(handleApiError(loadError));
    } finally {
      setIsLoading(false);
    }
  }, [decodedName]);

  useEffect(() => {
    void loadMeals();
  }, [loadMeals]);

  const visibleMeals = useMemo(() => paginate(meals, 1, visibleCount), [meals, visibleCount]);
  const hasMore = visibleCount < meals.length;

  const loadMore = useCallback(() => {
    if (hasMore) setVisibleCount((count) => count + PAGE_SIZE);
  }, [hasMore]);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore && !isLoading);

  return (
    <>
      <PageMeta title={`${decodedName} Meals`} />
      <Hero
        title={decodedName}
        description={`Discover hand-picked ${decodedName.toLowerCase()} recipes from TheMealDB.`}
      />

      <section className="container-shell pb-16">
        {error ? <ErrorState message={error} onRetry={() => void loadMeals()} /> : null}

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <MealCardSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {!isLoading && meals.length === 0 ? (
          <EmptyState message={`No meals found in ${decodedName}.`} />
        ) : null}

        {!isLoading && visibleMeals.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        ) : null}

        <div ref={sentinelRef} className="h-8" />
      </section>
    </>
  );
};
