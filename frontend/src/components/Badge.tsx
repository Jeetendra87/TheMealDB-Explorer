import { cn } from '@/utils/cn';

interface BadgeProps {
  children: string;
  className?: string;
}

export const Badge = ({ children, className }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-800 dark:bg-brand-950 dark:text-brand-200',
      className
    )}
  >
    {children}
  </span>
);
