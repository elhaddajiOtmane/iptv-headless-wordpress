<?php
 define('WP_CACHE', true);

// Added by WP Rocket
 // Added by WP Rocket
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */
// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', "iptv_nederland" );
/** Database username */
define( 'DB_USER', "root" );
/** Database password */
define( 'DB_PASSWORD', "" );
/** Database hostname */
define( 'DB_HOST', "127.0.0.1" );
/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );
/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );
/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'lK5!>X8e(vm}2t{omS<;T&!LZB){G;&M,M4JFaTkH6Sj(/yGmO$;9(p`2JP_?)1=' );
define( 'SECURE_AUTH_KEY',   '9)s>/tWl|X4wcJ_=7s>TnjNeot(#<rhxpf_h;BS3RVe>->d22`)nH@@|oZmtQ+#6' );
define( 'LOGGED_IN_KEY',     'g:(t)9+q;uWRA)xW0suAiOZlR[[M!`kO/*:X#Lzn_IWFi1o!K?EU131^nBnsG>Az' );
define( 'NONCE_KEY',         'WFAaM8PzCqWMMJ`FVUx@4pAWm:K>V5&:b+7&JB_/W:q2yaJ!-,2aUz}<h]O+}U3+' );
define( 'AUTH_SALT',         '`K$lQi0,ptE;iQ.nV Wex`kzR{pHAC36~lA~C}~q^DO-EN$RF#_SR9+D/!Brpj)]' );
define( 'SECURE_AUTH_SALT',  'Zd$,,kJV $!0ad$]toF&LLQ.1wq3;!+P(jm;V[o(Gs.T3Rh}cDeVvWZ8(U6H7@}9' );
define( 'LOGGED_IN_SALT',    '8).A`5<o9I0Io&mVMyhpFE4Dn(X;okr3~g~06FKGyDs[gKOIIa1VbN3lv7c[SUT;' );
define( 'NONCE_SALT',        'iy>4!-N+z _l{XKh(b3}ZG{&K*DGMM#vSoQM|%>_//yFJm,3gL0E~_oZMLa$^pP!' );
define( 'WP_CACHE_KEY_SALT', 'wRf-A8W.Yfg2 )_*3IOT33cf+L4`SO{DjO[>P8($rVN7W&w<6k/?E#Rgkb}M R$H' );
/**#@-*/
/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );
/* Add any custom values between this line and the "stop editing" line. */
define( 'FS_METHOD', 'direct' );
define( 'WP_AUTO_UPDATE_CORE', true );
define( 'DUPLICATOR_AUTH_KEY', 'Uj#,V!C0-~--|58>x{$U,J(u{9FySWzc{)ITl>MX 6Ca/]vGP~eesm&^,i28W`ox' );
define( 'WP_DEBUG_LOG', false );
define( 'WP_DEBUG_DISPLAY', false );
define( 'HEADLESS_FRONTEND_URL', 'http://localhost:3000' );
/* That's all, stop editing! Happy publishing. */
/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname(__FILE__) . '/' );
}
/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';