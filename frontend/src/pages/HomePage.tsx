import { ChefHat, Shuffle } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Hero } from '@/components/Hero';
import { MealCard } from '@/components/MealCard';
import { PageMeta } from '@/components/PageMeta';
import { RandomMealModal } from '@/components/RandomMealModal';
import { RecentSearches } from '@/components/RecentSearches';
import { SearchBar } from '@/components/SearchBar';
import { MealCardSkeleton } from '@/components/skeletons/MealCardSkeleton';
import { useDebounce } from '@/hooks/useDebounce';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getRandomMeal, handleApiError, searchMeals } from '@/services/api';
import { usePreferencesStore } from '@/store/preferencesStore';
import type { MealDetails, MealSummary } from '@/types/meal';
import { paginate } from '@/utils/pagination';

const PAGE_SIZE = 12;

export const HomePage = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [randomOpen, setRandomOpen] = useState(false);
  const [randomLoading, setRandomLoading] = useState(false);
  const [randomMeal, setRandomMeal] = useState<MealDetails | null>(null);

  const debouncedQuery = useDebounce(query, 450);
  const addRecentSearch = usePreferencesStore((state) => state.addRecentSearch);

  const loadSearch = useCallback(async (searchTerm: string) => {
    if (searchTerm.trim().length < 2) {
      setMeals([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchMeals(searchTerm.trim());
      setMeals(results);
      setVisibleCount(PAGE_SIZE);
      addRecentSearch(searchTerm.trim());
    } catch (loadError) {
      setMeals([]);
      setError(handleApiError(loadError));
    } finally {
      setIsLoading(false);
    }
  }, [addRecentSearch]);

  useEffect(() => {
    void loadSearch(debouncedQuery);
  }, [debouncedQuery, loadSearch]);

  const visibleMeals = useMemo(() => paginate(meals, 1, visibleCount), [meals, visibleCount]);
  const hasMore = visibleCount < meals.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setVisibleCount((count) => count + PAGE_SIZE);
    }
  }, [hasMore]);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore && !isLoading);

  const openRandomMeal = async () => {
    setRandomOpen(true);
    setRandomLoading(true);
    setRandomMeal(null);

    try {
      const meal = await getRandomMeal();
      setRandomMeal(meal);
    } catch (loadError) {
      setError(handleApiError(loadError));
      setRandomOpen(false);
    } finally {
      setRandomLoading(false);
    }
  };

  return (
    <>
      <PageMeta title="Search Recipes" />
      <Hero
        title="Find your next favorite meal in seconds."
        description="Search by dish name, explore curated categories, save favorites locally, and spin up chef-level inspiration with one click."
      >
        <SearchBar value={query} onChange={setQuery} />
        <RecentSearches onSelect={setQuery} />
        <button type="button" className="btn-primary mt-5" onClick={() => void openRandomMeal()}>
          <Shuffle className="h-4 w-4" />
          I&apos;m Feeling Hungry
        </button>
      </Hero>

      <section className="container-shell pb-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Results</p>
            <h2 className="text-2xl font-black">
              {debouncedQuery.trim().length >= 2 ? `Matches for "${debouncedQuery}"` : 'Start typing to search'}
            </h2>
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <ChefHat className="h-4 w-4" />
            {meals.length} recipes
          </p>
        </div>

        {error ? <ErrorState message={error} onRetry={() => void loadSearch(debouncedQuery)} /> : null}

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <MealCardSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {!isLoading && debouncedQuery.trim().length >= 2 && meals.length === 0 ? (
          <EmptyState message="Try another keyword like pasta, curry, or dessert." />
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

      <RandomMealModal
        meal={randomMeal}
        isOpen={randomOpen}
        isLoading={randomLoading}
        onClose={() => setRandomOpen(false)}
      />
    </>
  );
};
