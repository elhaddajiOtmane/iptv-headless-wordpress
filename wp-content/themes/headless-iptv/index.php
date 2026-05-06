<?php
/**
 * Headless IPTV Nederland — Minimal fallback template.
 *
 * This theme has no frontend. All public requests are redirected
 * to the Next.js frontend via functions.php.
 * This file exists only because WordPress requires index.php.
 */

// Redirect any request that somehow bypasses functions.php
$frontend_url = defined('HEADLESS_FRONTEND_URL')
    ? HEADLESS_FRONTEND_URL
    : 'https://iptv-nederland.com';

wp_redirect($frontend_url, 301);
exit;
