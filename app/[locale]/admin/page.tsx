'use client';

import dynamic from 'next/dynamic';

const AnalyticsDashboard = dynamic(
  () => import('@/components/admin/AnalyticsDashboard'),
  {
    loading: () => (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600"></div>
      </div>
    ),
    ssr: false,
  }
);

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Admin Panel
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analytics and Click Tracking Dashboard
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  );
}
