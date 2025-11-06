import { NextResponse } from 'next/server';
import { getAnalyticsData, getSummary } from '@/lib/analytics/analyticsService';

export async function GET() {
  try {
    const data = getAnalyticsData();
    const summary = getSummary();

    return NextResponse.json(
      { success: true, data, summary },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
