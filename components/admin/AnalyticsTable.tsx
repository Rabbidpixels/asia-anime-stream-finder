'use client';

import { format, parseISO } from 'date-fns';
import type { ClickStats } from '@/types/analytics';

interface AnalyticsTableProps {
  stats: Record<string, ClickStats>;
}

export default function AnalyticsTable({ stats }: AnalyticsTableProps) {
  const sortedStats = Object.values(stats).sort(
    (a, b) => b.totalClicks - a.totalClicks
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Detailed Statistics
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                First Click
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Click
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Top Locale
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedStats.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No analytics data available yet
                </td>
              </tr>
            ) : (
              sortedStats.map((stat) => {
                const topLocale = Object.entries(stat.clicksByLocale).sort(
                  ([, a], [, b]) => b - a
                )[0]?.[0] || 'N/A';

                return (
                  <tr key={stat.itemId} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {stat.itemName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          stat.itemType === 'affiliate_link'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : stat.itemType === 'ad'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}
                      >
                        {stat.itemType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {stat.totalClicks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {stat.firstClick
                        ? format(parseISO(stat.firstClick), 'MMM d, yyyy')
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {stat.lastClick
                        ? format(parseISO(stat.lastClick), 'MMM d, yyyy')
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 uppercase">
                      {topLocale}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
