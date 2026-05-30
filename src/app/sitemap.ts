import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily', // Updates daily (new games)
      priority: 1.0,
    },
    // New pages will be here when added to the project
  ];
}
