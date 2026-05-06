# WordPress Inventory — iptv-nederland.com
# Snapshot taken: 2026-05-06
# Purpose: Track what exists BEFORE migration so nothing is lost

## Active Theme
- IPTV-Nederland (child of hello-elementor)

## Installed Plugins
- block-bad-queries
- click-to-chat-for-whatsapp
- contact-form-7
- elementor
- elementor-pro
- elementskit-lite
- essential-addons-elementor
- essential-addons-for-elementor-lite
- festingervault
- fluent-crm
- fluent-smtp
- fluentcampaign-pro
- hostinger
- seo-by-rank-math
- seraphinite-accelerator-ext
- unlimited-elements-for-elementor-premium
- woocommerce-google-adwords-conversion-tracking-tag
- wordfence
- wordfence-activator

## Database
- Name: iptv_nederland
- Host: 127.0.0.1 (local) / Hostinger MySQL (production)
- Size: ~51MB (SQL dump)
- Prefix: wp_

## Media Uploads
- /wp-content/uploads/2023/
- /wp-content/uploads/2024/
- /wp-content/uploads/2026/
- /wp-content/uploads/elementor/
- /wp-content/uploads/fluentcrm/
- /wp-content/uploads/rank-math/

## Key Config
- WP_CACHE: true (WP Rocket)
- FS_METHOD: direct
- WP_AUTO_UPDATE_CORE: true

## Post-Migration: Keep
- contact-form-7 (form processing)
- fluent-crm + fluent-smtp + fluentcampaign-pro (email marketing)
- seo-by-rank-math (SEO data source)
- wordfence + wordfence-activator (WP admin security)

## Post-Migration: Remove
- elementor + elementor-pro (replaced by Next.js)
- elementskit-lite (Elementor addon)
- essential-addons-elementor + essential-addons-for-elementor-lite (Elementor addons)
- unlimited-elements-for-elementor-premium (Elementor addon)
- block-bad-queries (move to edge security)
- seraphinite-accelerator-ext (frontend caching → Next.js)
- woocommerce-google-adwords-conversion-tracking-tag (move to GTM)
- festingervault (license manager, not needed)
- hostinger (hosting-specific, review)

## Post-Migration: Add
- wp-graphql (GraphQL API)
- wp-graphql-acf (ACF in GraphQL)
- wp-graphql-rank-math (SEO in GraphQL)
- advanced-custom-fields-pro (structured content)
