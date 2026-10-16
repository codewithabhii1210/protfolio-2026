import { lazy, Suspense } from 'react';

const Admin = lazy(() => import('./pages/Admin'));
const Site = lazy(() => import('./Site'));

function NotFound() {
  return (
    <main
      className="sec"
      style={{ minHeight: '80vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '7rem 1.5rem 4rem' }}
    >
      <div>
        <h1 style={{ fontSize: 'clamp(4rem,14vw,8rem)', lineHeight: 1, margin: 0 }}>404</h1>
        <p className="lead">This page doesn't exist.</p>
        <a className="btn primary" href="/">Back to home</a>
      </div>
    </main>
  );
}

export default function App() {
  const path = location.pathname;

  if (path === '/admin' || path.startsWith('/admin/')) return <Suspense fallback={null}><Admin /></Suspense>;
  if (path !== '/' && path !== '/index.html') return <Suspense fallback={null}><NotFound /></Suspense>;
  return <Suspense fallback={null}><Site /></Suspense>;
}
