export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
        Admin Panel
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <p className="text-gray-600 dark:text-gray-300">
          Admin panel functionality will be implemented here.
        </p>
        <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Manage anime database</li>
          <li>• Update streaming platforms</li>
          <li>• Moderate content</li>
          <li>• View analytics</li>
        </ul>
      </div>
    </div>
  );
}
