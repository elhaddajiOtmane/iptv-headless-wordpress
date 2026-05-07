import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'iptv-nederland.test',
      },
      {
        protocol: 'http',
        hostname: 'iptv-nederland.com.test',
      },
      {
        protocol: 'https',
        hostname: 'iptv-nederland.com',
      },
      {
        protocol: 'https',
        hostname: 'cms.iptv-nederland.com',
      },
    ],
  },

  // 301 redirects for changed URL structures during migration
  async redirects() {
    return [
      // Old WordPress pagination → Next.js blog
      {
        source: '/page/:num',
        destination: '/blog',
        permanent: true,
      },
      // Old WordPress feed → blog
      {
        source: '/feed',
        destination: '/blog',
        permanent: true,
      },
      // WordPress category → blog
      {
        source: '/category/:slug',
        destination: '/blog',
        permanent: true,
      },
      // WordPress tag → blog
      {
        source: '/tag/:slug',
        destination: '/blog',
        permanent: true,
      },
      // Old WordPress post URLs (if structure changed)
      // e.g. /2024/01/post-slug → /blog/post-slug
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // Elementor pages that may have had different slugIs
      {
        source: '/pakket',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/pakketten',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/prijzen',
        destination: '/pricing',
        permanent: true,
      },
      // WP admin catch → CMS subdomain
      {
        source: '/wp-admin',
        destination: 'https://cms.iptv-nederland.com/wp-admin',
        permanent: false,
      },
      {
        source: '/wp-login.php',
        destination: 'https://cms.iptv-nederland.com/wp-login.php',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
