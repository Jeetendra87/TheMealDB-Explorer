import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = 'Unable to load content',
  message,
  onRetry
}: ErrorStateProps) => (
  <div className="surface-card flex flex-col items-start gap-4 p-8 text-left">
    <div className="inline-flex rounded-2xl bg-red-100 p-3 text-red-700 dark:bg-red-950 dark:text-red-300">
      <AlertTriangle className="h-6 w-6" />
    </div>
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{message}</p>
    </div>
    {onRetry ? (
      <button type="button" className="btn-secondary" onClick={onRetry}>
        <RotateCcw className="h-4 w-4" />
        Try again
      </button>
    ) : null}
  </div>
);
