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
  exit;
}