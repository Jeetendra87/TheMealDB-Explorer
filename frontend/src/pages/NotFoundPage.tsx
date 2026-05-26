import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';

export const NotFoundPage = () => (
  <>
    <PageMeta title="Page Not Found" />
    <section className="container-shell py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">404</p>
      <h1 className="mt-3 text-4xl font-black">This page is off the menu.</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">The route you requested does not exist.</p>
      <Link to="/" className="btn-primary mt-8 inline-flex">
        Back to home
      </Link>
    </section>
  </>
);
