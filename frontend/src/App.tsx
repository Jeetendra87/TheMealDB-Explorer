import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppRoutes } from '@/routes/AppRoutes';

export const App = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <AppRoutes />
      <Toaster richColors position="top-right" />
    </ErrorBoundary>
  </BrowserRouter>
);
