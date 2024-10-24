import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Carwash App',
    short_name: 'Carwash App',
    description: 'Carwash App',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/screenshot.png',
        sizes: '540x720',
        type: 'image/png',
      },
      {
        src: '/screenshot.png',
        sizes: '540x720',
        type: 'image/png',
      },
    ],
  };
}
