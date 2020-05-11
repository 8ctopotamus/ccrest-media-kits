<?php

$upload_dir = wp_upload_dir();
$upload_dir = $upload_dir['basedir'];
$upload_dir = $upload_dir . '/ccrest-media-kits';

define('CCREST_MEDIA_KITS_ZIP_STORAGE', $upload_dir);

/*
** create ZIP storage directory in wp-content/uploads
*/
if (! is_dir(CCREST_MEDIA_KITS_ZIP_STORAGE)) {
  mkdir( CCREST_MEDIA_KITS_ZIP_STORAGE, 0700 );
}


// routes
add_action( 'admin_post_nopriv_cc_actions', 'cc_actions' );
add_action( 'admin_post_cc_actions', 'cc_actions' );
function cc_actions() {
  include( plugin_dir_path( __DIR__ ) . 'inc/router.php' );
}

function ccrest_init() {
  /* Make sure that ACF is installed and activated */
  if( !class_exists('acf') || !function_exists( 'the_field') ) {
    add_action( 'admin_notices', function() {
      ?>
        <div class="update-nag notice">
          <p><?php _e( '<strong>[cCrest Media Kits]:</strong> Please install the <a href="https://www.advancedcustomfields.com/" target="_blank">Advanced Custom Fields PRO</a>. It is required for this plugin to work properly.', PLUGIN_SLUG); ?></p>
        </div>
      <?php
    } );
  }
}
add_action('init', 'ccrest_init');

function ccrest_enqueue_scripts_styles() {
  // check if shorcode is used
  global $post, $wpdb;
	$shortcode_found = false;
	if (has_shortcode($post->post_content, 'ccrest-media-kits') ) {
		 $shortcode_found = true;
	} else if ( isset($post->ID) ) { // checks post meta
		$result = $wpdb->get_var( $wpdb->prepare(
			"SELECT count(*) FROM $wpdb->postmeta " .
			"WHERE post_id = %d and meta_value LIKE '%%ccrest-media-kits%%'", $post->ID ) );
		$shortcode_found = ! empty( $result );
  }
  $isLocalhost = in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'));

  wp_register_style( 'animate_css', '//cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css' );

  $testing = false; // DEVS, make this TRUE to test compiled react app on Localhost

  // localhost
  if ( $isLocalhost && !$testing ) {
    $react_app_js = 'http://localhost:3000/static/js/bundle.js';
  } 
  // production
  else {
    $cssBundle = glob(plugin_dir_path( __DIR__ ) . "client/build/static/css/*.css");
    $jsBundle = glob(plugin_dir_path( __DIR__ ) . "client/build/static/js/*.js");
    if (!empty($jsBundle)) {        
      $cssPartsPath = explode(PLUGIN_SLUG, $cssBundle[0]);
      $react_app_css = site_url() . '/wp-content/plugins/' . PLUGIN_SLUG . $cssPartsPath[1];
      wp_register_style( 'react_app_css', $react_app_css );
      $jsPathParts = explode(PLUGIN_SLUG, $jsBundle[0]);
      $react_app_js = site_url() . '/wp-content/plugins/' . PLUGIN_SLUG . $jsPathParts[1];
    }
  }

  // if ( !file_exists($react_app_js) ) {
  //   $noteification = $isLocalhost 
  //   ? 'Are you running the React app server?'
  //   : 'Did you compile the React app?';
  //   echo '[' . PLUGIN_SLUG . '] ' . $noteification;
  // }

  wp_register_script( 'react_app_js', $react_app_js, array(), false, true );

  if ( $shortcode_found && $react_app_js ) {
    wp_enqueue_style('animate_css');
    if ( !$isLocalhost ) {
      wp_enqueue_style('react_app_css');
    }
    $appData = cc_get_wp_data();
    wp_localize_script( 'react_app_js', 'wp_data', [
      'data' => $appData,
      'site_url' => site_url(),
      'admin_ajax_url' => esc_url( admin_url('admin-post.php')),
      'PLUGIN_SLUG' => PLUGIN_SLUG,
      'user' => wp_get_current_user()->data,
    ] );
    wp_enqueue_script('react_app_js');
  }
}
add_action('wp_enqueue_scripts', 'ccrest_enqueue_scripts_styles');