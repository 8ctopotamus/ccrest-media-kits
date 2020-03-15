<?php 
function cc_get_wp_data() {
  $data = [];
  // assets
  $args = ['post_type'  => 'assets'];
  $the_query = new WP_Query( $args );
  if ( $the_query->have_posts() ) {
    while ( $the_query->have_posts() ) {
      $the_query->the_post();
      $p = get_post();
      $p->files = get_field('files');
      $p->categories = [];
      $catIDs = wp_get_post_categories($p->ID);
      if ($catIDs) {
        foreach ($catIDs as $cID) {
          $cat = get_category($cID);
          $p->categories[] = $cat->slug;
        }
      }
      $p->tags = [];
      $tags = get_the_tags($p->ID);
      if ($tags) {
        foreach($tags as $t) {
          $p->tags[] = $t->slug;
        }
      }
      $data['assets'][] = $p;
    }
  }
  wp_reset_postdata();
  // categories data
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
  return $data;
}