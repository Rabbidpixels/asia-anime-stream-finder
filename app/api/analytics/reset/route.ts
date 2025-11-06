import { NextResponse } from 'next/server';
import { resetAnalytics } from '@/lib/analytics/analyticsService';

export async function POST() {
  try {
    resetAnalytics();

    return NextResponse.json(
      { success: true, message: 'Analytics data reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resetting analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset analytics' },
      { status: 500 }
    );
  }
}
