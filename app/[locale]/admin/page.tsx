import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

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
