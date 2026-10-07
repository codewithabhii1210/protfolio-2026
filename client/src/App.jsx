import { lazy, Suspense } from 'react';

const Admin = lazy(() => import('./pages/Admin'));
const Site = lazy(() => import('./Site'));

export default function App() {
  const Page = location.pathname.startsWith('/admin') ? Admin : Site;

  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}
