<?php
/**
 * Headless IPTV Nederland — Theme Functions
 *
 * Configures WordPress as a headless CMS:
 * - Redirects all frontend requests to Next.js
 * - Registers navigation menus for GraphQL consumption
 * - Enables featured image support
 * - Adds CORS headers for Next.js
 * - Cleans up unnecessary frontend assets
 */

defined('ABSPATH') || exit;

// ─── Frontend URL ───────────────────────────────────────────
$headless_frontend_url = defined('HEADLESS_FRONTEND_URL')
    ? HEADLESS_FRONTEND_URL
    : 'https://iptv-nederland.com';

// ─── Redirect Frontend to Next.js ───────────────────────────
// Allow: wp-admin, wp-login, wp-json, graphql, wp-cron, previews
add_action('template_redirect', function () use ($headless_frontend_url) {
    // Never redirect admin, API, or auth requests
    if (
        is_admin() ||
        is_preview() ||
        wp_doing_cron() ||
        wp_doing_ajax() ||
        (defined('REST_REQUEST') && REST_REQUEST) ||
        (defined('GRAPHQL_REQUEST') && GRAPHQL_REQUEST) ||
        strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false ||
        strpos($_SERVER['REQUEST_URI'], '/graphql') !== false ||
        strpos($_SERVER['REQUEST_URI'], '/wp-login') !== false ||
        strpos($_SERVER['REQUEST_URI'], '/wp-admin') !== false
    ) {
        return;
    }

    // Redirect everything else to Next.js frontend
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    wp_redirect($headless_frontend_url . $path, 301);
    exit;
});

// ─── Theme Support ──────────────────────────────────────────
add_action('after_setup_theme', function () {
    // Featured images (consumed via GraphQL)
    add_theme_support('post-thumbnails');

    // Title tag support
    add_theme_support('title-tag');

    // Navigation menus (exposed via WPGraphQL)
    register_nav_menus([
        'primary'  => __('Primary Navigation', 'headless-iptv'),
        'footer'   => __('Footer Navigation', 'headless-iptv'),
    ]);

    // Wide/full alignment for Gutenberg
    add_theme_support('align-wide');

    // Editor styles
    add_theme_support('editor-styles');
});

// ─── CORS Headers for Next.js ───────────────────────────────
add_action('init', function () use ($headless_frontend_url) {
    // Only add CORS on API/GraphQL requests
    if (
        strpos($_SERVER['REQUEST_URI'], '/graphql') !== false ||
        strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false
    ) {
        header("Access-Control-Allow-Origin: {$headless_frontend_url}");
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');

        // Handle preflight
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            status_header(200);
            exit;
        }
    }
});

// ─── Clean Up Frontend ──────────────────────────────────────
// Remove unnecessary stuff since we have no frontend
add_action('init', function () {
    // Remove emoji scripts
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('admin_print_styles', 'print_emoji_styles');

    // Remove RSD/WLW links
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');

    // Remove WP version meta
    remove_action('wp_head', 'wp_generator');

    // Remove shortlink
    remove_action('wp_head', 'wp_shortlink_wp_head');

    // Remove REST API link from head (still accessible, just not advertised)
    remove_action('wp_head', 'rest_output_link_wp_head');

    // Remove oEmbed
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
});

// ─── Disable Frontend Enqueue ───────────────────────────────
// No styles or scripts needed on frontend
add_action('wp_enqueue_scripts', function () {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-blocks-style');
    wp_dequeue_style('global-styles');
}, 100);

// ─── Expose Custom Image Sizes to GraphQL ───────────────────
add_action('after_setup_theme', function () {
    add_image_size('hero', 1920, 1080, true);
    add_image_size('card', 600, 400, true);
    add_image_size('thumbnail-lg', 400, 400, true);
});

// ─── Preview Redirect ───────────────────────────────────────
// Redirect preview links to Next.js preview mode
add_filter('preview_post_link', function ($preview_link, $post) use ($headless_frontend_url) {
    $slug = $post->post_name;
    $post_type = $post->post_type;

    $path = $post_type === 'page' ? "/{$slug}" : "/blog/{$slug}";

    return add_query_arg([
        'preview' => 'true',
        'id'      => $post->ID,
    ], $headless_frontend_url . '/api/preview' . $path);
}, 10, 2);

// ─── Include ACF Fields ─────────────────────────────────────
require_once get_template_directory() . '/inc/acf-fields.php';

// ─── Revalidation Webhook ──────────────────────────────────────
add_action('save_post', function ($post_id, $post, $update) use ($headless_frontend_url) {
    // Skip revisions, autosaves, and non-published posts
    if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id) || $post->post_status !== 'publish') {
        return;
    }

    $secret = defined('REVALIDATION_SECRET') ? REVALIDATION_SECRET : 'super-secret-revalidation-token';

    $slug = $post->post_name;
    $post_type = $post->post_type;

    $path = $post_type === 'page' ? "/{$slug}" : "/blog/{$slug}";
    if ($slug === 'home' || $slug === 'homepage') {
        $path = '/';
    }

    $webhook_url = $headless_frontend_url . '/api/revalidate';

    wp_remote_post($webhook_url, [
        'headers' => [
            'Content-Type' => 'application/json',
            'x-revalidate-secret' => $secret
        ],
        'body' => wp_json_encode(['path' => $path]),
        'blocking' => false // Do not wait for response
    ]);
}, 10, 3);
