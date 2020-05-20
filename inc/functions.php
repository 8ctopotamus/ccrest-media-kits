<?php

function GENERATE_ZIP () {
  $to = $_POST['email'];
  $toZip = $_POST['toZip'];
  $status = 200;
  if (empty($to)) {
    die('No email provided');
  }
  if (count($toZip) === 0) {
    die('No files provided');
  }
  $newFileName = 'test_new.zip';
  $newFilePath = CCREST_MEDIA_KITS_ZIP_STORAGE . '/' . $newFileName;
  $zip = new ZipArchive;
  if ($zip->open($newFilePath, ZipArchive::CREATE) === TRUE)
  {
    foreach ($toZip as $folder) {
      foreach ($folder as $file) {
        $download_file = file_get_contents($file);
        $zip->addFromString(basename($file), $download_file);
      }
    }
    $zip->close();
  } else {
    $status = 500;
  }
  if (file_exists($newFilePath)) {
    $downloadPath = wp_upload_dir()['baseurl'] . '/ccrest-media-kits-storage/' . $newFileName;
    echo $downloadPath;
    http_response_code($status);
  } else {
    echo 'ZIP creation failed';
    http_response_code($status);
  }
  die();
}


/**
 * Check if given term has child terms
 *
 * https://wordpress.stackexchange.com/questions/176317/check-if-current-category-has-subcategories/176332
 * @param Integer $term_id
 * @param String $taxonomy
 *
 * @return Boolean
 */
function category_has_children( $term_id = 0, $taxonomy = 'category' ) {
  $children = get_categories( array( 
      'child_of'      => $term_id,
      'taxonomy'      => $taxonomy,
      'hide_empty'    => false,
      'fields'        => 'ids',
  ) );
  return ( $children );
}

function cc_get_wp_data() {
  $data = [];
  // assets
  $args = [
    'post_type'  => 'assets',
    'posts_per_page' => -1,
  ];
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
          $p->tags[] = $t->name;
        }
      }
      $data['assets'][] = $p;
    }
  }
  wp_reset_postdata();
  // categories data for the filter
  $allcats = get_categories([
    'type'                     => 'assets',
    'taxonomy'                 => 'category',
    'hide_empty'               => 1,
    'hierarchical'             => 1,
    'childless' => false,
  ]);
  // find parents
  $parents =  array();
  foreach ($allcats as $cat) {
    if ($cat->category_parent === 0 && count(category_has_children($cat->term_id)) > 0 ) {
      $cat->children = array();
      $parents[] = $cat;
    }
  }
  //  find children and assign it to corresponding parrent  
  foreach ($allcats as $cat) {
    if ($cat->category_parent != 0) {
      foreach ($parents as $parent) {
        if ($cat->category_parent === $parent->term_id) {
          $parent->children[] = $cat;
        }
      }
    }
  }
  // remove empty parents
  $data['categories'] = $parents;
  return $data;
  exit;
}