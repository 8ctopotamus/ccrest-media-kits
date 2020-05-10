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
          <p><?php _e( '<strong>[cCrest Media Kits]:</strong> Please install the <a href="https://www.advancedcustomfields.com/" target="_blank">Advanced Custom Fields PRO</a>. It is required for this plugin to work properly.', 'ccrest-media-kits'); ?></p>
        </div>
      <?php
    } );
  }

  /* Create /media-repository page if doesn't exist */
  $page = get_page_by_path( PLUGIN_SLUG , OBJECT );
  if ( !isset($page) ) {
    $post_details = array(
      'post_title'    => ucwords(str_replace('-', ' ', PLUGIN_SLUG)),
      'post_name'     => PLUGIN_SLUG,
      'post_status'   => 'publish',
      'post_author'   => 1,
      'post_type'     => 'page'
      );
      wp_insert_post( $post_details );
  }
}
add_action('init', 'ccrest_init');


/* Add 'lost password?' link to login form */
add_action( 'login_form_middle', 'add_lost_password_link' );
function add_lost_password_link() {
	return '<a href="/wp-login.php?action=lostpassword">Lost Password?</a>';
}


function ccrest_enqueue_scripts_styles() {
  wp_register_style( 'animate_css', '//cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css' );

  // localhost
  if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
    $app_js = 'http://localhost:3000/static/js/bundle.js';
  } 
  // production
  else {

    $string = file_get_contents(plugin_dir_path( __DIR__ ) . "client/build/static/asset-manifest.json");
    $json_a = json_decode($string, true);
    var_dump(a);

    $app_js = null; // load built react app here
  }

  wp_register_script( 'app_js', $app_js, array(), false, true );

  if (is_page(PLUGIN_SLUG)) {
    wp_enqueue_style('animate_css');
    $appData = cc_get_wp_data();
    wp_localize_script( 'app_js', 'wp_data', [
      'data' => $appData,
      'site_url' => site_url(),
      'admin_ajax_url' => esc_url( admin_url('admin-post.php')),
      'PLUGIN_SLUG' => PLUGIN_SLUG,
      'user' => wp_get_current_user()->data,
    ] );
    wp_enqueue_script('app_js');
  }
}
add_action('wp_enqueue_scripts', 'ccrest_enqueue_scripts_styles');


// load template
function ccrest_load_template( $page_template ) {
  if ( is_page( PLUGIN_SLUG ) ) {
    $page_template = dirname( __DIR__ ) . '/client/public/index.php';
  }
  return $page_template;
}
add_filter( 'page_template', 'ccrest_load_template' );