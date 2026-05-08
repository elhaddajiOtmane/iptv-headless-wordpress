<?php
/**
 * Content Seeder for Headless WordPress → Next.js Migration
 * 
 * Seeds ACF fields for Homepage, Pricing, Contact pages + Global Options.
 * Run via: http://iptv-nederland.com.test/scripts/seed-content.php
 * Or CLI:  php scripts/seed-content.php
 * 
 * IMPORTANT: Delete this file after seeding. Do NOT leave on production.
 */

// Bootstrap WordPress
require_once( dirname( __DIR__ ) . '/wp-load.php' );

if ( ! function_exists( 'update_field' ) ) {
    echo "ERROR: ACF plugin is not active. Please activate ACF first.\n";
    exit(1);
}

echo "=== IPTV Nederland Content Seeder ===\n\n";

// ─────────────────────────────────────────────
// Helper: find or create a page by slug
// ─────────────────────────────────────────────
function get_or_create_page( string $slug, string $title ): int {
    $page = get_page_by_path( $slug );
    if ( $page ) {
        echo "  Found existing page: '{$title}' (ID {$page->ID})\n";
        return $page->ID;
    }

    $id = wp_insert_post([
        'post_title'  => $title,
        'post_name'   => $slug,
        'post_status' => 'publish',
        'post_type'   => 'page',
    ]);

    if ( is_wp_error( $id ) ) {
        echo "  ERROR creating page '{$title}': " . $id->get_error_message() . "\n";
        return 0;
    }

    echo "  Created page: '{$title}' (ID {$id})\n";
    return $id;
}

// ─────────────────────────────────────────────
// 1. HOMEPAGE
// ─────────────────────────────────────────────
echo "─── 1. Homepage ───\n";

// Try multiple possible slugs for homepage
$home_id = 0;
$home_page = get_page_by_path( 'home' );
if ( ! $home_page ) {
    $home_page = get_page_by_path( 'home-copy' );
}
if ( ! $home_page ) {
    // Check if front page is set
    $front_id = (int) get_option( 'page_on_front' );
    if ( $front_id > 0 ) {
        $home_page = get_post( $front_id );
    }
}

if ( $home_page ) {
    $home_id = $home_page->ID;
    echo "  Found homepage (ID {$home_id})\n";
} else {
    $home_id = get_or_create_page( 'home', 'Home' );
}

if ( $home_id ) {
    // Hero Section
    update_field( 'hero_title', 'Premium IPTV Service in Nederland', $home_id );
    update_field( 'hero_subtitle', 'Ervaar de beste kwaliteit met ons premium IPTV netwerk. Meer dan 10.000+ live kanalen, 50.000+ films en series. Sneller, stabieler en meer content dan ooit tevoren.', $home_id );
    update_field( 'hero_cta_text', 'Bekijk Pakketten', $home_id );
    update_field( 'hero_cta_url', '/pricing', $home_id );
    echo "  ✓ Hero fields saved\n";

    // Features
    $features = [
        [
            'title'       => '10.000+ Live Kanalen',
            'description' => 'Toegang tot duizenden live TV-kanalen uit Nederland, België, Duitsland, Turkije, Arabisch en meer. Inclusief alle sport- en filmzenders.',
            'icon_name'   => 'tv',
        ],
        [
            'title'       => 'Ultra HD Kwaliteit',
            'description' => 'Geniet van kristalheldere beeldkwaliteit in Full HD en 4K. Onze servers garanderen een buffer-vrije ervaring.',
            'icon_name'   => 'monitor',
        ],
        [
            'title'       => '50.000+ Films & Series',
            'description' => 'Enorme bibliotheek met de nieuwste films en populaire series. Inclusief Netflix, Disney+ en HBO content.',
            'icon_name'   => 'film',
        ],
        [
            'title'       => 'Anti-Freeze Technologie',
            'description' => 'Onze geavanceerde servers zorgen voor een vloeiende kijkervaring zonder onderbrekingen, 24/7 stabiel.',
            'icon_name'   => 'zap',
        ],
        [
            'title'       => 'Multi-Device Support',
            'description' => 'Kijk op Smart TV, Android, iOS, Fire Stick, MAG Box en meer. Tot 2 apparaten tegelijkertijd.',
            'icon_name'   => 'smartphone',
        ],
        [
            'title'       => '24/7 Klantenservice',
            'description' => 'Ons support team staat 7 dagen per week voor je klaar via WhatsApp. Snelle reactietijd gegarandeerd.',
            'icon_name'   => 'headphones',
        ],
    ];
    update_field( 'features', $features, $home_id );
    echo "  ✓ Features saved (" . count($features) . " items)\n";

    // Testimonials
    $testimonials = [
        [
            'name'   => 'Ahmed B.',
            'text'   => 'Beste IPTV service die ik heb gehad. Stabiel, snel en geweldige kwaliteit. De installatie was super eenvoudig met de hulp van hun support team.',
            'rating' => 5,
        ],
        [
            'name'   => 'Mark de V.',
            'text'   => 'Al 2 jaar klant en nog nooit problemen gehad. Het aanbod is enorm en de prijs-kwaliteit verhouding is uitstekend.',
            'rating' => 5,
        ],
        [
            'name'   => 'Fatima K.',
            'text'   => 'Eindelijk een betrouwbare IPTV provider. De Arabische zenders werken perfect en de VOD bibliotheek is indrukwekkend.',
            'rating' => 5,
        ],
        [
            'name'   => 'Jan W.',
            'text'   => 'Na meerdere providers te hebben geprobeerd, ben ik bij IPTV Nederland gebleven. De kwaliteit en stabiliteit zijn top.',
            'rating' => 4,
        ],
        [
            'name'   => 'Sofia L.',
            'text'   => 'Geweldige service! De Turkse kanalen werken foutloos en de klantenservice reageert altijd snel via WhatsApp.',
            'rating' => 5,
        ],
    ];
    update_field( 'testimonials', $testimonials, $home_id );
    echo "  ✓ Testimonials saved (" . count($testimonials) . " items)\n";

    // Set as front page
    update_option( 'show_on_front', 'page' );
    update_option( 'page_on_front', $home_id );
    echo "  ✓ Set as static front page\n";
}

// ─────────────────────────────────────────────
// 2. PRICING PAGE
// ─────────────────────────────────────────────
echo "\n─── 2. Pricing Page ───\n";
$pricing_id = get_or_create_page( 'pricing', 'Pricing' );

if ( $pricing_id ) {
    $plans = [
        [
            'name'          => '1 Maand',
            'price'         => '14.99',
            'period'        => 'maand',
            'is_popular'    => false,
            'cta_url'       => '/contact',
            'features_list' => "10.000+ Live kanalen\n50.000+ Films & Series\nFull HD & 4K kwaliteit\n2 apparaten tegelijk\nAnti-freeze technologie\nEPG TV-gids\n24/7 Support",
        ],
        [
            'name'          => '3 Maanden',
            'price'         => '34.99',
            'period'        => '3 maanden',
            'is_popular'    => true,
            'cta_url'       => '/contact',
            'features_list' => "10.000+ Live kanalen\n50.000+ Films & Series\nFull HD & 4K kwaliteit\n2 apparaten tegelijk\nAnti-freeze technologie\nEPG TV-gids\n24/7 Support\nGratis installatie hulp",
        ],
        [
            'name'          => '6 Maanden',
            'price'         => '59.99',
            'period'        => '6 maanden',
            'is_popular'    => false,
            'cta_url'       => '/contact',
            'features_list' => "10.000+ Live kanalen\n50.000+ Films & Series\nFull HD & 4K kwaliteit\n3 apparaten tegelijk\nAnti-freeze technologie\nEPG TV-gids\n24/7 Priority Support\nGratis installatie hulp\nCatch-up TV (7 dagen)",
        ],
        [
            'name'          => '12 Maanden',
            'price'         => '99.99',
            'period'        => 'jaar',
            'is_popular'    => false,
            'cta_url'       => '/contact',
            'features_list' => "10.000+ Live kanalen\n50.000+ Films & Series\nFull HD & 4K kwaliteit\n3 apparaten tegelijk\nAnti-freeze technologie\nEPG TV-gids\n24/7 VIP Support\nGratis installatie hulp\nCatch-up TV (7 dagen)\nGratis updates",
        ],
    ];
    update_field( 'pricing_plans', $plans, $pricing_id );
    echo "  ✓ Pricing plans saved (" . count($plans) . " plans)\n";
}

// ─────────────────────────────────────────────
// 3. CONTACT PAGE
// ─────────────────────────────────────────────
echo "\n─── 3. Contact Page ───\n";
$contact_id = get_or_create_page( 'contact', 'Contact' );

if ( $contact_id ) {
    update_field( 'email_address', 'info@iptv-nederland.com', $contact_id );
    update_field( 'whatsapp_number', '+31612345678', $contact_id );
    update_field( 'physical_address', "Nederland\nOnline dienstverlening", $contact_id );
    echo "  ✓ Contact fields saved\n";
}

// ─────────────────────────────────────────────
// 4. GLOBAL OPTIONS
// ─────────────────────────────────────────────
echo "\n─── 4. Global Options ───\n";

// Global options use 'option' as post_id in ACF
update_field( 'footer_text', '© ' . date('Y') . ' IPTV Nederland. Alle rechten voorbehouden.', 'option' );
echo "  ✓ Footer text saved\n";

$social_links = [
    [
        'platform' => 'whatsapp',
        'url'      => 'https://wa.me/31612345678',
    ],
    [
        'platform' => 'instagram',
        'url'      => 'https://instagram.com/iptvnederland',
    ],
    [
        'platform' => 'facebook',
        'url'      => 'https://facebook.com/iptvnederland',
    ],
];
update_field( 'social_links', $social_links, 'option' );
echo "  ✓ Social links saved (" . count($social_links) . " links)\n";

// ─────────────────────────────────────────────
// 5. BLOG PAGE (for blog listing)
// ─────────────────────────────────────────────
echo "\n─── 5. Blog Page ───\n";
$blog_id = get_or_create_page( 'blog', 'Blog' );
if ( $blog_id ) {
    update_option( 'page_for_posts', $blog_id );
    echo "  ✓ Set as posts page\n";
}

// ─────────────────────────────────────────────
// 6. NAVIGATION MENUS
// ─────────────────────────────────────────────
echo "\n─── 6. Navigation Menus ───\n";

// Main Navigation
$main_menu_name = 'Main Navigation';
$main_menu = wp_get_nav_menu_object( $main_menu_name );
if ( ! $main_menu ) {
    $main_menu_id = wp_create_nav_menu( $main_menu_name );
    wp_update_nav_menu_item( $main_menu_id, 0, [
        'menu-item-title'   => 'Home',
        'menu-item-url'     => home_url('/'),
        'menu-item-status'  => 'publish',
        'menu-item-type'    => 'custom',
    ]);
    wp_update_nav_menu_item( $main_menu_id, 0, [
        'menu-item-title'   => 'Pakketten',
        'menu-item-url'     => home_url('/pricing'),
        'menu-item-status'  => 'publish',
        'menu-item-type'    => 'custom',
    ]);
    wp_update_nav_menu_item( $main_menu_id, 0, [
        'menu-item-title'   => 'Blog',
        'menu-item-url'     => home_url('/blog'),
        'menu-item-status'  => 'publish',
        'menu-item-type'    => 'custom',
    ]);
    wp_update_nav_menu_item( $main_menu_id, 0, [
        'menu-item-title'   => 'Contact',
        'menu-item-url'     => home_url('/contact'),
        'menu-item-status'  => 'publish',
        'menu-item-type'    => 'custom',
    ]);
    echo "  ✓ Main Navigation menu created\n";
} else {
    echo "  ⊘ Main Navigation already exists\n";
}

// Footer Navigation
$footer_menu_name = 'Footer Navigation';
$footer_menu = wp_get_nav_menu_object( $footer_menu_name );
if ( ! $footer_menu ) {
    $footer_menu_id = wp_create_nav_menu( $footer_menu_name );
    wp_update_nav_menu_item( $footer_menu_id, 0, [
        'menu-item-title'   => 'Privacy Policy',
        'menu-item-url'     => home_url('/privacy-policy'),
        'menu-item-status'  => 'publish',
        'menu-item-type'    => 'custom',
    ]);
    wp_update_nav_menu_item( $footer_menu_id, 0, [
        'menu-item-title'   => 'Algemene Voorwaarden',
        'menu-item-url'     => home_url('/terms-and-conditions'),
        'menu-item-status'  => 'publish',
        'menu-item-type'    => 'custom',
    ]);
    wp_update_nav_menu_item( $footer_menu_id, 0, [
        'menu-item-title'   => 'FAQ',
        'menu-item-url'     => home_url('/faq'),
        'menu-item-status'  => 'publish',
        'menu-item-type'    => 'custom',
    ]);
    echo "  ✓ Footer Navigation menu created\n";
} else {
    echo "  ⊘ Footer Navigation already exists\n";
}

// Register menu locations
$locations = get_theme_mod( 'nav_menu_locations', [] );
$main_menu_obj = wp_get_nav_menu_object( $main_menu_name );
$footer_menu_obj = wp_get_nav_menu_object( $footer_menu_name );
if ( $main_menu_obj ) $locations['primary'] = $main_menu_obj->term_id;
if ( $footer_menu_obj ) $locations['footer'] = $footer_menu_obj->term_id;
set_theme_mod( 'nav_menu_locations', $locations );
echo "  ✓ Menu locations registered\n";

// ─────────────────────────────────────────────
// 7. SAMPLE BLOG POST
// ─────────────────────────────────────────────
echo "\n─── 7. Sample Blog Post ───\n";

$sample_slug = 'iptv-installatie-gids';
$existing = get_page_by_path( $sample_slug, OBJECT, 'post' );
if ( ! $existing ) {
    $post_id = wp_insert_post([
        'post_title'   => 'IPTV Installatie Gids: Stap voor Stap',
        'post_name'    => $sample_slug,
        'post_content' => '<p>In deze uitgebreide gids leggen we stap voor stap uit hoe je IPTV installeert op verschillende apparaten.</p>

<h2>Wat heb je nodig?</h2>
<p>Om IPTV te kunnen gebruiken heb je het volgende nodig:</p>
<ul>
<li>Een stabiele internetverbinding (minimaal 25 Mbps)</li>
<li>Een compatibel apparaat (Smart TV, Android Box, Fire Stick, etc.)</li>
<li>Een actief IPTV abonnement</li>
</ul>

<h2>Installatie op Android / Smart TV</h2>
<p>Download de IPTV Smarters Pro app uit de Google Play Store of de app store van je Smart TV. Open de app en voer je inloggegevens in die je van ons hebt ontvangen.</p>

<h2>Installatie op Fire Stick</h2>
<p>Ga naar Instellingen → Mijn Fire TV → Ontwikkelaarsopties → Apps van onbekende bronnen. Download vervolgens de Downloader app en installeer IPTV Smarters Pro.</p>

<h2>Problemen? Neem contact op!</h2>
<p>Kom je er niet uit? Ons support team helpt je graag via WhatsApp. We kunnen je zelfs op afstand helpen met de installatie.</p>',
        'post_excerpt' => 'Leer hoe je IPTV eenvoudig installeert op elk apparaat. Van Smart TV tot Fire Stick — stap voor stap uitgelegd.',
        'post_status'  => 'publish',
        'post_type'    => 'post',
        'post_author'  => 1,
    ]);
    echo "  ✓ Sample blog post created (ID {$post_id})\n";
} else {
    echo "  ⊘ Sample blog post already exists\n";
}

// ─────────────────────────────────────────────
// DONE
// ─────────────────────────────────────────────
echo "\n=== Content seeding complete! ===\n";
echo "\nNext steps:\n";
echo "  1. Start Laragon if not running\n";
echo "  2. Visit: http://iptv-nederland.com.test/scripts/seed-content.php\n";
echo "  3. Then check: http://localhost:3000\n";
echo "  4. DELETE this file when done!\n";
