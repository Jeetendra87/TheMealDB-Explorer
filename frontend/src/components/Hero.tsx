import { Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

interface HeroProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export const Hero = ({ title, description, children }: HeroProps) => (
  <section className="container-shell py-10 sm:py-14">
    <div className="surface-card animate-slide-up overflow-hidden p-8 sm:p-12">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-800 dark:bg-brand-950 dark:text-brand-200">
        <Sparkles className="h-4 w-4" />
        Recipe discovery platform
      </p>
      <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300">{description}</p>
      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  </section>
);
