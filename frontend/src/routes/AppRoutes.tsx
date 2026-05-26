import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MealCardSkeleton } from '@/components/skeletons/MealCardSkeleton';
import { AppLayout } from '@/layouts/AppLayout';

const HomePage = lazy(() => import('@/pages/HomePage').then((module) => ({ default: module.HomePage })));
const CategoriesPage = lazy(() =>
  import('@/pages/CategoriesPage').then((module) => ({ default: module.CategoriesPage }))
);
const CategoryMealsPage = lazy(() =>
  import('@/pages/CategoryMealsPage').then((module) => ({ default: module.CategoryMealsPage }))
);
const MealDetailsPage = lazy(() =>
  import('@/pages/MealDetailsPage').then((module) => ({ default: module.MealDetailsPage }))
);
const FavoritesPage = lazy(() =>
  import('@/pages/FavoritesPage').then((module) => ({ default: module.FavoritesPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage }))
);

const PageFallback = () => (
  <div className="container-shell grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <MealCardSkeleton key={index} />
    ))}
  </div>
);

export const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route
        index
        element={
          <Suspense fallback={<PageFallback />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="categories"
        element={
          <Suspense fallback={<PageFallback />}>
            <CategoriesPage />
          </Suspense>
        }
      />
      <Route
        path="categories/:name"
        element={
          <Suspense fallback={<PageFallback />}>
            <CategoryMealsPage />
          </Suspense>
        }
      />
      <Route
        path="meals/:id"
        element={
          <Suspense fallback={<PageFallback />}>
            <MealDetailsPage />
          </Suspense>
        }
      />
      <Route
        path="favorites"
        element={
          <Suspense fallback={<PageFallback />}>
            <FavoritesPage />
          </Suspense>
        }
      />
      <Route
        path="404"
        element={
          <Suspense fallback={<PageFallback />}>
            <NotFoundPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>
  </Routes>
);
