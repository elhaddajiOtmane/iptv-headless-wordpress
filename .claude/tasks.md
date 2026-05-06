# Headless WordPress + Next.js Migration — Tasks

**Project**: iptv-nederland.com
**Status**: Not Started
**Total**: 0 / 116

---

## Milestone 1 — WordPress Backend (Headless CMS Setup)

> Turn WordPress into a headless content API. No frontend, just dashboard + GraphQL.

- [ ] **1.1 Install Required Plugins**
  - [ ] Install WPGraphQL
  - [ ] Install WPGraphQL for ACF
  - [ ] Install WPGraphQL for Rank Math SEO
  - [ ] Install WPGraphQL CORS
  - [ ] Install Advanced Custom Fields (ACF) Pro
  - [ ] Verify GraphQL endpoint works at `/graphql`

- [ ] **1.2 Create Headless Theme**
  - [ ] Create `wp-content/themes/headless-iptv/` directory
  - [ ] Write `style.css` (theme header only)
  - [ ] Write `index.php` (minimal fallback)
  - [ ] Write `functions.php` (redirect frontend, register menus, disable unnecessary features)
  - [ ] Activate headless theme in WordPress dashboard

- [ ] **1.3 Content Modeling (ACF Field Groups)**
  - [ ] Homepage Fields: Hero section (title, subtitle, CTA text, CTA URL, background image)
  - [ ] Homepage Fields: Features list (repeater: icon, title, description)
  - [ ] Homepage Fields: Testimonials (repeater: name, text, rating)
  - [ ] Pricing Page Fields: Plans (repeater: name, price, period, features list, CTA, popular flag)
  - [ ] Contact Page Fields: Business info (address, phone, email, WhatsApp number)
  - [ ] Global Options: Site logo, social links, footer text
  - [ ] Register all field groups to show in GraphQL

- [ ] **1.4 Migrate Content from Elementor → ACF**
  - [ ] Extract homepage content from Elementor and enter into ACF fields
  - [ ] Extract pricing page content and enter into ACF fields
  - [ ] Extract contact page content and enter into ACF fields
  - [ ] Migrate existing blog posts (these work as-is with WPGraphQL)
  - [ ] Verify all content is accessible via GraphQL introspection

- [ ] **1.5 WordPress Configuration**
  - [ ] Update `wp-config.php` with headless constants
  - [ ] Configure WordPress to allow CORS from Next.js domain
  - [ ] Set up WordPress navigation menus (Main Nav, Footer Nav)
  - [ ] Expose menus via WPGraphQL

---

## Milestone 2 — Next.js Project Scaffolding

> Bootstrap the Next.js app with TypeScript, App Router, and GraphQL client.

- [ ] **2.1 Initialize Project**
  - [ ] Run `npx create-next-app@latest` with TypeScript + App Router
  - [ ] Configure `tsconfig.json` (strict mode)
  - [ ] Set up `.env.local` with `WORDPRESS_GRAPHQL_URL`
  - [ ] Configure `next.config.ts` (image domains, rewrites)

- [ ] **2.2 GraphQL Client Layer**
  - [ ] Create `src/lib/wordpress.ts` — reusable `fetchGraphQL()` function
  - [ ] Create `src/lib/types.ts` — TypeScript interfaces for all WP content types
  - [ ] Create `src/lib/queries/pages.ts` — page queries
  - [ ] Create `src/lib/queries/posts.ts` — blog post queries
  - [ ] Create `src/lib/queries/menus.ts` — navigation menu queries
  - [ ] Create `src/lib/queries/seo.ts` — Rank Math SEO queries
  - [ ] Test all queries against local WordPress GraphQL endpoint

- [ ] **2.3 Design System & Global Styles**
  - [ ] Create `src/styles/globals.css` — CSS custom properties (colors, spacing, typography)
  - [ ] Define dark/premium color palette for IPTV brand
  - [ ] Set up Google Fonts (Inter or similar)
  - [ ] Create CSS utility classes and component styles
  - [ ] Add CSS animations / transitions library

- [ ] **2.4 Layout Components**
  - [ ] Create `src/app/layout.tsx` — root layout with fonts, metadata, global structure
  - [ ] Create `src/components/layout/Header.tsx` — navigation from WordPress menus
  - [ ] Create `src/components/layout/Footer.tsx` — dynamic content from WordPress
  - [ ] Create `src/components/layout/Navigation.tsx` — responsive nav + mobile menu
  - [ ] Create `src/app/not-found.tsx` — custom 404 page

---

## Milestone 3 — Page Development

> Build each page as a Next.js Server Component consuming WordPress GraphQL data.

- [ ] **3.1 Homepage** (`src/app/page.tsx`)
  - [ ] Hero section with CTA
  - [ ] Features grid
  - [ ] Pricing preview / teaser
  - [ ] Testimonials carousel
  - [ ] SEO metadata from Rank Math
  - [ ] Responsive design verification

- [ ] **3.2 Pricing Page** (`src/app/pricing/page.tsx`)
  - [ ] Pricing cards grid (data from ACF)
  - [ ] Feature comparison highlights
  - [ ] CTA buttons
  - [ ] SEO metadata
  - [ ] Responsive design verification

- [ ] **3.3 Contact Page** (`src/app/contact/page.tsx`)
  - [ ] Contact form component (client component)
  - [ ] WhatsApp chat button
  - [ ] Business info display
  - [ ] SEO metadata
  - [ ] Responsive design verification

- [ ] **3.4 Blog** (`src/app/blog/`)
  - [ ] Blog listing page with pagination (`page.tsx`)
  - [ ] Single blog post page with ISR (`[slug]/page.tsx`)
  - [ ] `generateStaticParams()` for all post slugs
  - [ ] `generateMetadata()` from Rank Math SEO data
  - [ ] Related posts section
  - [ ] Responsive design verification

- [ ] **3.5 Shared UI Components**
  - [ ] `Button.tsx` — primary, secondary, outline variants
  - [ ] `Card.tsx` — reusable content card
  - [ ] `PricingCard.tsx` — pricing plan card with feature list
  - [ ] `Hero.tsx` — hero section with background
  - [ ] `Features.tsx` — feature grid section
  - [ ] `Testimonials.tsx` — testimonial cards/carousel

---

## Milestone 4 — Integrations

> Connect forms, tracking, and real-time content updates.

- [ ] **4.1 Contact Form**
  - [ ] Build `ContactForm.tsx` client component with validation
  - [ ] Create `/api/contact/route.ts` — proxy to WordPress CF7 REST endpoint
  - [ ] Add success/error states and loading indicator
  - [ ] Wire up FluentCRM tagging on form submission (WordPress side)
  - [ ] Test end-to-end form submission

- [ ] **4.2 WhatsApp Chat**
  - [ ] Create `WhatsAppButton.tsx` — floating chat widget
  - [ ] Pull WhatsApp number from WordPress (ACF global options)
  - [ ] Add click tracking event

- [ ] **4.3 Google Ads / Analytics**
  - [ ] Set up Google Tag Manager via `next/script`
  - [ ] Migrate conversion tracking from WooCommerce plugin to GTM
  - [ ] Verify conversion events fire correctly

- [ ] **4.4 On-Demand ISR (Revalidation Webhook)**
  - [ ] Create `/api/revalidate/route.ts` with secret token validation
  - [ ] Configure WordPress to POST to Vercel on content update
  - [ ] Test: update content in WP → verify frontend updates within seconds

---

## Milestone 5 — SEO & Performance

> Ensure zero SEO regression and maximum performance.

- [ ] **5.1 SEO Migration**
  - [ ] Map all Rank Math fields to Next.js `generateMetadata()` on every page
  - [ ] Implement Open Graph and Twitter Card meta tags
  - [ ] Implement JSON-LD structured data (schema from Rank Math)
  - [ ] Create `src/app/sitemap.ts` — dynamic sitemap from GraphQL
  - [ ] Create `src/app/robots.ts` — robots.txt configuration
  - [ ] Set up 301 redirects for any changed URLs

- [ ] **5.2 Performance Optimization**
  - [ ] Audit with Lighthouse — target 90+ all categories
  - [ ] Optimize images with `next/image` (lazy loading, WebP, sizing)
  - [ ] Implement font optimization (`next/font`)
  - [ ] Review and minimize JavaScript bundle
  - [ ] Verify Core Web Vitals (LCP, FID, CLS)

---

## Milestone 6 — Deployment & Go-Live

> Ship it.

- [ ] **6.1 WordPress Backend Deployment**
  - [ ] Set up `cms.iptv-nederland.com` subdomain on Hostinger
  - [ ] Point WordPress to subdomain
  - [ ] Restrict frontend access (redirect to Next.js)
  - [ ] Harden: disable XML-RPC, limit login attempts
  - [ ] Test GraphQL endpoint is accessible from internet

- [ ] **6.2 Next.js Frontend Deployment**
  - [ ] Create GitHub repository for Next.js project
  - [ ] Connect repository to Vercel
  - [ ] Configure environment variables on Vercel
  - [ ] Deploy preview build and test
  - [ ] Configure custom domain `iptv-nederland.com` on Vercel

- [ ] **6.3 DNS Cutover**
  - [ ] Update `iptv-nederland.com` DNS to point to Vercel
  - [ ] Update `cms.iptv-nederland.com` DNS to point to Hostinger
  - [ ] Verify SSL certificates on both domains
  - [ ] Wait for DNS propagation

- [ ] **6.4 Post-Launch QA**
  - [ ] Test all pages load correctly on production
  - [ ] Test contact form submission end-to-end
  - [ ] Test ISR revalidation webhook
  - [ ] Test Open Graph previews (Facebook Debugger, Twitter Card Validator)
  - [ ] Submit updated sitemap to Google Search Console
  - [ ] Monitor for 404s and crawl errors
  - [ ] Verify Google Ads conversion tracking

- [ ] **6.5 Cleanup**
  - [ ] Remove Elementor + Elementor Pro from WordPress
  - [ ] Remove ElementsKit Lite, Essential Addons, Unlimited Elements
  - [ ] Remove Hello Elementor theme
  - [ ] Remove Seraphinite Accelerator + WP Rocket
  - [ ] Remove Block Bad Queries
  - [ ] Remove WooCommerce Google Ads plugin
  - [ ] Delete old `.htaccess` backup files
  - [ ] Remove suspicious files (`default.php`, `sanz.PHP`, `create_autologin_*.php`)
  - [ ] Database cleanup (remove Elementor meta, transients, orphaned data)
