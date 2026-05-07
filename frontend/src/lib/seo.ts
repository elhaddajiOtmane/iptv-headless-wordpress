import { Metadata } from 'next';
import { WPSeo, WPPost } from './types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iptv-nederland.com';
const SITE_NAME = 'IPTV Nederland';

// --- Metadata builder from Rank Math SEO fields ---

interface SeoMetadataOptions {
  seo?: WPSeo | null;
  fallbackTitle: string;
  fallbackDescription: string;
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  images?: { url: string; alt?: string }[];
}

export function buildMetadata(opts: SeoMetadataOptions): Metadata {
  const {
    seo,
    fallbackTitle,
    fallbackDescription,
    path,
    type = 'website',
    publishedTime,
    modifiedTime,
    images = [],
  } = opts;

  const title = seo?.title || fallbackTitle;
  const description = seo?.metaDesc || fallbackDescription;
  const ogTitle = seo?.opengraphTitle || title;
  const ogDescription = seo?.opengraphDescription || description;
  const canonicalUrl = `${SITE_URL}${path}`;

  // Merge Rank Math OG image with any provided images
  const ogImages = seo?.opengraphImage
    ? [{ url: seo.opengraphImage.sourceUrl, alt: seo.opengraphImage.altText || ogTitle }]
    : images;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'nl_NL',
      images: ogImages,
      ...(type === 'article' && publishedTime && { publishedTime }),
      ...(type === 'article' && modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: ogImages.map((img) => (typeof img === 'string' ? img : img.url)),
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

// --- JSON-LD Structured Data ---

/** Organization schema — used site-wide */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['nl', 'en'],
    },
  };
}

/** WebSite schema with search action */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'nl-NL',
  };
}

/** WebPage schema for static pages */
export function webPageJsonLd(opts: { title: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/** Article schema for blog posts */
export function articleJsonLd(post: WPPost) {
  const stripped = post.excerpt?.replace(/<[^>]+>/g, '') || '';
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: stripped,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    image: post.featuredImage?.node?.sourceUrl,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

/** FAQ schema — useful for pricing page */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
