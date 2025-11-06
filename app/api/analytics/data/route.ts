import { NextResponse } from 'next/server';
import { getAnalyticsData, getSummary } from '@/lib/analytics/analyticsService';

// Revalidate every 60 seconds
export const revalidate = 60;

export async function GET() {
  try {
    const data = getAnalyticsData();
    const summary = getSummary();

    return NextResponse.json(
      { success: true, data, summary },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
