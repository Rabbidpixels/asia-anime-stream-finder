'use client';

import { useEffect, useState } from 'react';
import AnalyticsCharts from './AnalyticsCharts';
import AnalyticsTable from './AnalyticsTable';
import type { AnalyticsData, AnalyticsSummary } from '@/types/analytics';

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/data');
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        setSummary(result.summary);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset all analytics data? This action cannot be undone.')) {
      return;
    }

    try {
      setResetting(true);
      const response = await fetch('/api/analytics/reset', {
        method: 'POST',
      });

      const result = await response.json();

      if (result.success) {
        await fetchAnalytics();
        alert('Analytics data has been reset successfully.');
      } else {
        alert('Failed to reset analytics data.');
      }
    } catch (error) {
      console.error('Failed to reset analytics:', error);
      alert('Failed to reset analytics data.');
    } finally {
      setResetting(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!data || !summary) {
    return (
      <div className="text-center py-12 text-gray-600 dark:text-gray-400">
        <p>No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Clicks</p>
              <p className="text-3xl font-bold mt-2">{summary.totalClicks}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Affiliate Clicks</p>
              <p className="text-3xl font-bold mt-2">{summary.totalAffiliateClicks}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Ad Clicks</p>
              <p className="text-3xl font-bold mt-2">{summary.totalAdClicks}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Streaming Links</p>
              <p className="text-3xl font-bold mt-2">{summary.totalStreamingLinkClicks}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={fetchAnalytics}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-md"
        >
          Refresh Data
        </button>
        <button
          onClick={handleReset}
          disabled={resetting}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resetting ? 'Resetting...' : 'Reset Analytics'}
        </button>
      </div>

      {/* Charts */}
      <AnalyticsCharts summary={summary} />

      {/* Table */}
      <AnalyticsTable stats={data.stats} />
    </div>
  );
}
