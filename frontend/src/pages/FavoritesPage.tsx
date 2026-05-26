import { EmptyState } from '@/components/EmptyState';
import { Hero } from '@/components/Hero';
import { MealCard } from '@/components/MealCard';
import { PageMeta } from '@/components/PageMeta';
import { usePreferencesStore } from '@/store/preferencesStore';

export const FavoritesPage = () => {
  const favorites = usePreferencesStore((state) => state.favorites);

  return (
    <>
      <PageMeta title="Favorites" />
      <Hero
        title="Your favorite recipes"
        description="Favorites are persisted in localStorage so you can quickly return to meals you love."
      />

      <section className="container-shell pb-16">
        {favorites.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            message="Tap the heart icon on any recipe card to save it here."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};
