import { NextRequest, NextResponse } from 'next/server';
import { trackClick } from '@/lib/analytics/analyticsService';
import type { ClickEvent } from '@/types/analytics';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const clickEvent: Partial<ClickEvent> = {
      itemId: body.itemId,
      itemType: body.itemType,
      itemName: body.itemName,
      locale: body.locale,
      userAgent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
    };

    const tracked = trackClick(clickEvent);

    return NextResponse.json(
      { success: true, event: tracked },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track click' },
      { status: 500 }
    );
  }
}
