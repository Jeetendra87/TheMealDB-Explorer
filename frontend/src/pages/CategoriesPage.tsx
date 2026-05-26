import { useEffect, useState } from 'react';
import { CategoryCard } from '@/components/CategoryCard';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Hero } from '@/components/Hero';
import { PageMeta } from '@/components/PageMeta';
import { CategoryCardSkeleton } from '@/components/skeletons/CategoryCardSkeleton';
import { getCategories, handleApiError } from '@/services/api';
import type { Category } from '@/types/meal';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCategories();
      setCategories(data);
    } catch (loadError) {
      setError(handleApiError(loadError));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadCategories();
  }, []);

  return (
    <>
      <PageMeta title="Categories" />
      <Hero
        title="Browse by category"
        description="From comfort food classics to seafood and desserts, explore beautifully organized categories."
      />

      <section className="container-shell pb-16">
        {error ? <ErrorState message={error} onRetry={() => void loadCategories()} /> : null}

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {!isLoading && categories.length === 0 ? (
          <EmptyState message="No categories are available right now." />
        ) : null}

        {!isLoading && categories.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
};
