<?php

define('PLUGIN_SLUG', 'media-repository');

function ccrest_init() {
  /* Make sure that ACF is installed and activated */
  if( !class_exists('acf') || !function_exists( 'the_field') ) {
    add_action( 'admin_notices', function() {
      ?>
        <div class="update-nag notice">
          <p><?php _e( '<strong>Assets Repository:</strong> Please install the <a href="https://www.advancedcustomfields.com/" target="_blank">Advanced Custom Fields PRO</a>. It is required for this plugin to work properly.', 'ccrest-media-repo'); ?></p>
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


function ccrest_enqueue_script() {
  if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
    $app_js = 'http://localhost:3000/static/js/bundle.js';
  } else {
    echo 'IS LIVE';
  }
  wp_enqueue_script( 'app_js', $app_js, array(), false, true );
}
add_action('wp_enqueue_scripts', 'ccrest_enqueue_script');


// load template
function ccrest_load_template( $page_template ) {
  if ( is_page( PLUGIN_SLUG ) ) {
    // assets
    $args = ['post_type'  => 'assets'];
    $the_query = new WP_Query( $args );
    $data = [];
    if ( $the_query->have_posts() ) {
      while ( $the_query->have_posts() ) {
        $the_query->the_post();
        $p = get_post();
        $p->featured_image = get_the_post_thumbnail_url();
        $p->files = get_field('files');
        $data['assets'][] = $p;
      }
    } 
    wp_reset_postdata();
    // categories
    $allcats = get_categories([
      'type'                     => 'assets',
      'taxonomy'                 => 'category',
      'hide_empty'               => 1,
      'hierarchical'             => 1,
    ]);
    // find parents
    $parents = $all_ids = array();
    foreach ($allcats as $cats) {
      if ($cats->category_parent === 0 ) {
        $cats->children = array();
        $parents[] = $cats;
      }
    }
    //  find children and assign it to corresponding parrent  
    foreach ($allcats as $cats) {
      if ($cats->category_parent != 0) {
        foreach ($parents as $parent) {
          if ($cats->category_parent === $parent->term_id) {
            $parent->children[] = $cats;
          }
        }
      }
    }
    $data['categories'] = $parents;
    echo '<script>window.data =' . json_encode($data) . '</script>';
    $page_template = dirname( __DIR__ ) . '/client/public/index.php';
  }
  return $page_template;
}
add_filter( 'page_template', 'ccrest_load_template' );


/*
 * Add 'lost password?' link to login form
 */
add_action( 'login_form_middle', 'add_lost_password_link' );
function add_lost_password_link() {
	return '<a href="/wp-login.php?action=lostpassword">Lost Password?</a>';
}



// add_action('wp_enqueue_scripts', function() {
  // if (!in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
  //   // PROD
  //   $JSfiles = scandir(dirname(__DIR__) . '/client/build/static/js/');
  //   $react_js_to_load = '';
  //   foreach($JSfiles as $filename) {
  //     if(strpos($filename,'.js')&&!strpos($filename,'.js.map')) {
  //       $react_js_to_load = plugin_dir_url( __DIR__ ) . 'client/build/static/js/' . $filename;
  //     }
  //   }
  // } else {
    // $react_js_to_load = 'http://localhost:3000/static/js/bundle.js';
  // }

  // wp_enqueue_script('plugin_name_react', $react_js_to_load, '', mt_rand(10,1000), true);
// });
