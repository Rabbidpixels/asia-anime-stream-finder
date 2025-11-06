'use client';

import { useLocale } from 'next-intl';
import type { TrackableItemType } from '@/types/analytics';

interface TrackableLinkProps {
  href: string;
  itemId: string;
  itemType: TrackableItemType;
  itemName: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function TrackableLink({
  href,
  itemId,
  itemType,
  itemName,
  children,
  className = '',
  target = '_blank',
  rel = 'noopener noreferrer',
}: TrackableLinkProps) {
  const locale = useLocale();

  const handleClick = async () => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          itemType,
          itemName,
          locale,
        }),
      });
    } catch (error) {
      console.error('Failed to track click:', error);
      // Don't prevent navigation even if tracking fails
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
