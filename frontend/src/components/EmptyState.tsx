import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message: string;
}

export const EmptyState = ({
  title = 'No recipes found',
  message
}: EmptyStateProps) => (
  <div className="surface-card flex flex-col items-center gap-3 p-10 text-center">
    <div className="rounded-full bg-brand-100 p-4 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
      <SearchX className="h-7 w-7" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="max-w-md text-slate-600 dark:text-slate-300">{message}</p>
  </div>
);
