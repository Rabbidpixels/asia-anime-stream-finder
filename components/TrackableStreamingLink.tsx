'use client';

import TrackableLink from './TrackableLink';
import type { StreamingPlatform } from '@/types/anime';

interface TrackableStreamingLinkProps {
  platform: StreamingPlatform;
  animeName: string;
  className?: string;
}

export default function TrackableStreamingLink({
  platform,
  animeName,
  className = '',
}: TrackableStreamingLinkProps) {
  const itemId = `${platform.name.toLowerCase().replace(/\s+/g, '_')}_link`;
  const itemName = `${platform.name} - ${animeName}`;

  return (
    <TrackableLink
      href={platform.url}
      itemId={itemId}
      itemType="streaming_link"
      itemName={itemName}
      className={className}
    >
      {platform.name}
    </TrackableLink>
  );
}
