import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

export const AppLayout = () => (
  <div className="min-h-screen">
    <Navbar />
    <Outlet />
    <footer className="container-shell border-t border-brand-200/70 py-10 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
      <p>Built for technical assessment with a production-ready React + Express architecture.</p>
    </footer>
  </div>
);
