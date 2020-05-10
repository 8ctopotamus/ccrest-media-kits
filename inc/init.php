<?php

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

  // localhost
  if ($isLocalhost) {
    $react_app_js = 'http://localhost:3000/static/js/bundle.js';
  } else {
    $string = file_get_contents(plugin_dir_path( __DIR__ ) . "client/build/static/asset-manifest.json");
    $json_a = json_decode($string, true);
    var_dump(a);
    $react_app_js = null; // load built react app here
  }

  wp_register_script( 'react_app_js', $react_app_js, array(), false, true );

  if ( $shortcode_found ) {
    wp_enqueue_style('animate_css');
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