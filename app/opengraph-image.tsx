import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Asia Anime Stream Finder';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            🎬 Asia Anime Stream Finder
          </div>
          <div
            style={{
              fontSize: 40,
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              maxWidth: 900,
            }}
          >
            Find where to stream your favorite anime across multiple platforms
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          Powered by Rabbid Pixel LLC
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
