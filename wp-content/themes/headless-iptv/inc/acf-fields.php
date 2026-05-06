<?php
/**
 * Register ACF Field Groups for Headless WordPress
 */

defined('ABSPATH') || exit;

add_action('acf/init', function() {
    // ---------------------------------------------------------
    // 1. Options Page (Requires ACF Pro)
    // ---------------------------------------------------------
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title'    => 'Global Options',
            'menu_title'    => 'Global Options',
            'menu_slug'     => 'global-options',
            'capability'    => 'edit_posts',
            'redirect'      => false,
            'show_in_graphql' => true,
            'graphql_field_name' => 'globalOptions',
        ]);
        
        // Global Options Fields
        acf_add_local_field_group([
            'key' => 'group_global_options',
            'title' => 'Global Options',
            'fields' => [
                [
                    'key' => 'field_global_logo',
                    'label' => 'Site Logo',
                    'name' => 'site_logo',
                    'type' => 'image',
                    'return_format' => 'array',
                    'show_in_graphql' => true,
                ],
                [
                    'key' => 'field_global_footer_text',
                    'label' => 'Footer Text',
                    'name' => 'footer_text',
                    'type' => 'text',
                    'show_in_graphql' => true,
                ],
                [
                    'key' => 'field_global_social_links',
                    'label' => 'Social Links',
                    'name' => 'social_links',
                    'type' => 'repeater',
                    'show_in_graphql' => true,
                    'sub_fields' => [
                        [
                            'key' => 'field_social_platform',
                            'label' => 'Platform',
                            'name' => 'platform',
                            'type' => 'select',
                            'choices' => [
                                'facebook' => 'Facebook',
                                'twitter' => 'Twitter/X',
                                'instagram' => 'Instagram',
                                'youtube' => 'YouTube',
                                'tiktok' => 'TikTok',
                                'whatsapp' => 'WhatsApp',
                            ],
                            'show_in_graphql' => true,
                        ],
                        [
                            'key' => 'field_social_url',
                            'label' => 'URL',
                            'name' => 'url',
                            'type' => 'url',
                            'show_in_graphql' => true,
                        ]
                    ]
                ]
            ],
            'location' => [
                [
                    [
                        'param' => 'options_page',
                        'operator' => '==',
                        'value' => 'global-options',
                    ]
                ]
            ],
            'show_in_graphql' => true,
            'graphql_field_name' => 'globalOptionsFields',
        ]);
    }

    // ---------------------------------------------------------
    // 2. Homepage Fields
    // ---------------------------------------------------------
    acf_add_local_field_group([
        'key' => 'group_homepage',
        'title' => 'Homepage Fields',
        'fields' => [
            // Hero Section
            [
                'key' => 'field_home_hero_title',
                'label' => 'Hero Title',
                'name' => 'hero_title',
                'type' => 'text',
                'show_in_graphql' => true,
            ],
            [
                'key' => 'field_home_hero_subtitle',
                'label' => 'Hero Subtitle',
                'name' => 'hero_subtitle',
                'type' => 'textarea',
                'show_in_graphql' => true,
            ],
            [
                'key' => 'field_home_hero_cta_text',
                'label' => 'Hero CTA Text',
                'name' => 'hero_cta_text',
                'type' => 'text',
                'show_in_graphql' => true,
            ],
            [
                'key' => 'field_home_hero_cta_url',
                'label' => 'Hero CTA URL',
                'name' => 'hero_cta_url',
                'type' => 'text',
                'show_in_graphql' => true,
            ],
            [
                'key' => 'field_home_hero_image',
                'label' => 'Hero Background Image',
                'name' => 'hero_image',
                'type' => 'image',
                'return_format' => 'array',
                'show_in_graphql' => true,
            ],
            // Features Repeater
            [
                'key' => 'field_home_features',
                'label' => 'Features',
                'name' => 'features',
                'type' => 'repeater',
                'show_in_graphql' => true,
                'sub_fields' => [
                    [
                        'key' => 'field_feature_title',
                        'label' => 'Title',
                        'name' => 'title',
                        'type' => 'text',
                        'show_in_graphql' => true,
                    ],
                    [
                        'key' => 'field_feature_desc',
                        'label' => 'Description',
                        'name' => 'description',
                        'type' => 'textarea',
                        'show_in_graphql' => true,
                    ],
                    [
                        'key' => 'field_feature_icon',
                        'label' => 'Icon Name',
                        'name' => 'icon_name',
                        'type' => 'text',
                        'instructions' => 'Name of the Lucide icon to use (e.g., tv, zap, shield)',
                        'show_in_graphql' => true,
                    ]
                ]
            ],
            // Testimonials Repeater
            [
                'key' => 'field_home_testimonials',
                'label' => 'Testimonials',
                'name' => 'testimonials',
                'type' => 'repeater',
                'show_in_graphql' => true,
                'sub_fields' => [
                    [
                        'key' => 'field_test_name',
                        'label' => 'Name',
                        'name' => 'name',
                        'type' => 'text',
                        'show_in_graphql' => true,
                    ],
                    [
                        'key' => 'field_test_text',
                        'label' => 'Text',
                        'name' => 'text',
                        'type' => 'textarea',
                        'show_in_graphql' => true,
                    ],
                    [
                        'key' => 'field_test_rating',
                        'label' => 'Rating',
                        'name' => 'rating',
                        'type' => 'number',
                        'min' => 1,
                        'max' => 5,
                        'default_value' => 5,
                        'show_in_graphql' => true,
                    ]
                ]
            ]
        ],
        'location' => [
            [
                [
                    'param' => 'page_template',
                    'operator' => '==',
                    'value' => 'template-home.php',
                ]
            ]
        ],
        'show_in_graphql' => true,
        'graphql_field_name' => 'homepageFields',
    ]);

    // ---------------------------------------------------------
    // 3. Pricing Page Fields
    // ---------------------------------------------------------
    acf_add_local_field_group([
        'key' => 'group_pricing',
        'title' => 'Pricing Page Fields',
        'fields' => [
            [
                'key' => 'field_pricing_plans',
                'label' => 'Pricing Plans',
                'name' => 'pricing_plans',
                'type' => 'repeater',
                'show_in_graphql' => true,
                'sub_fields' => [
                    [
                        'key' => 'field_plan_name',
                        'label' => 'Plan Name',
                        'name' => 'name',
                        'type' => 'text',
                        'show_in_graphql' => true,
                    ],
                    [
                        'key' => 'field_plan_price',
                        'label' => 'Price',
                        'name' => 'price',
                        'type' => 'text',
                        'show_in_graphql' => true,
                    ],
                    [
                        'key' => 'field_plan_period',
                        'label' => 'Period',
                        'name' => 'period',
                        'type' => 'text',
                        'show_in_graphql' => true,
                    ],
                    [
                        'key' => 'field_plan_popular',
                        'label' => 'Is Popular?',
                        'name' => 'is_popular',
                        'type' => 'true_false',
                        'ui' => 1,
                        'show_in_graphql' => true,
                    ],
                    [
                        'key' => 'field_plan_cta_url',
                        'label' => 'Checkout / CTA URL',
                        'name' => 'cta_url',
                        'type' => 'text',
                        'show_in_graphql' => true,
                    ],
                    [
                        'key' => 'field_plan_features',
                        'label' => 'Features List',
                        'name' => 'features_list',
                        'type' => 'textarea',
                        'instructions' => 'One feature per line',
                        'show_in_graphql' => true,
                    ]
                ]
            ]
        ],
        'location' => [
            [
                [
                    'param' => 'page_template',
                    'operator' => '==',
                    'value' => 'template-pricing.php',
                ]
            ]
        ],
        'show_in_graphql' => true,
        'graphql_field_name' => 'pricingFields',
    ]);

    // ---------------------------------------------------------
    // 4. Contact Page Fields
    // ---------------------------------------------------------
    acf_add_local_field_group([
        'key' => 'group_contact',
        'title' => 'Contact Page Fields',
        'fields' => [
            [
                'key' => 'field_contact_email',
                'label' => 'Email Address',
                'name' => 'email_address',
                'type' => 'email',
                'show_in_graphql' => true,
            ],
            [
                'key' => 'field_contact_whatsapp',
                'label' => 'WhatsApp Number',
                'name' => 'whatsapp_number',
                'type' => 'text',
                'show_in_graphql' => true,
            ],
            [
                'key' => 'field_contact_address',
                'label' => 'Physical Address',
                'name' => 'physical_address',
                'type' => 'textarea',
                'show_in_graphql' => true,
            ]
        ],
        'location' => [
            [
                [
                    'param' => 'page_template',
                    'operator' => '==',
                    'value' => 'template-contact.php',
                ]
            ]
        ],
        'show_in_graphql' => true,
        'graphql_field_name' => 'contactFields',
    ]);
});
