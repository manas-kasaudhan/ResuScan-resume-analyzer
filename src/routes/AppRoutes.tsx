import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Home = lazy(() => import('@/pages/Home'));
const Upload = lazy(() => import('@/pages/Upload'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Improve = lazy(() => import('@/pages/Improve'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-primary animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/improve" element={<Improve />} />
          </Routes>
        </main>
      </Suspense>
      <Footer />
    </div>
  );
}
