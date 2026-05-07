import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/queries/posts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iptv-nederland.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  // Dynamic blog posts from WordPress
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts(100);
    blogPosts = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Sitemap: Failed to fetch posts from WordPress', error);
  }

  return [...staticPages, ...blogPosts];
}
