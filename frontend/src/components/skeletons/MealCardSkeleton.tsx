export const MealCardSkeleton = () => (
  <div className="surface-card animate-pulse overflow-hidden">
    <div className="aspect-[4/3] bg-brand-100 dark:bg-slate-800" />
    <div className="space-y-3 p-4">
      <div className="h-5 w-3/4 rounded bg-brand-100 dark:bg-slate-800" />
      <div className="h-4 w-1/2 rounded bg-brand-100 dark:bg-slate-800" />
    </div>
  </div>
);
