<?php

function GENERATE_ZIP () {
  $to = $_POST['email'];
  $files = $_POST['files'];

  if (empty($to)) {
    die('No email provided');
  }

  // $wp_admin_dir = getcwd(); // wp-admin
  // chdir(PLUGIN_ZIPS_DIR);

  var_dump($files);


  // $zip = new ZipArchive;
  // if ($zip->open(CCREST_MEDIA_KITS_ZIP_STORAGE . 'test_new.zip', ZipArchive::CREATE) === TRUE)
  // {
  //   // $zip->addFile(plugin_dir_path( __FILE__ ).'test.txt');  
  //   $zip->close();
  //   echo 'ok';
  // } else {
  //   echo 'ZIP creation failed';
  // }

  
  // # create new zip object
  // $zip = new ZipArchive();

  // # create a temp file & open it
  // $tmp_file = tempnam('.', '');
  // $zip->open($tmp_file, ZipArchive::CREATE);

  // # loop through each file
  // foreach ($files as $file) {
  //     # download file
  //     $download_file = file_get_contents($file);

  //     #add it to the zip
  //     $zip->addFromString(basename($file), $download_file);
  // }

  // # close zip
  // $zip->close();

  # send the file to the browser as a download
  // header('Content-disposition: attachment; filename="my-file.zip"');
  // header('Content-type: application/zip');
  //   readfile($tmp_file);
  // unlink($tmp_file);

  // chdir($wp_admin_dir);
  echo 'success';
  die();
} 


/* creates a compressed zip file
   https://davidwalsh.name/create-zip-php */
// function create_zip($files = array(), $destination = '', $overwrite = false) {
// 	//if the zip file already exists and overwrite is false, return false
// 	if (file_exists($destination) && !$overwrite) { return false; }
// 	//vars
// 	$valid_files = array();
// 	//if files were passed in...
// 	if (is_array($files)) {
// 		//cycle through each file
// 		foreach($files as $file) {
// 			//make sure the file exists
// 			if (remoteFileExists($file)) {
// 				$valid_files[] = $file;
// 			}
// 		}
// 	}
// 	//if we have good files...
// 	if (count($valid_files)) {
// 		//create the archive
// 		$zip = new ZipArchive();
// 		if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
// 			return false;
// 		}
// 		//add the files
// 		foreach($valid_files as $file) {
// 			$zip->addFile($file,$file);
// 		}
// 		//debug
// 		//echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;
		
// 		//close the zip -- done!
// 		$zip->close();
		
// 		//check to make sure the file exists
// 		return file_exists($destination);
// 	} else {
// 		return false;
// 	}
// }

function remoteFileExists($url) {
  $curl = curl_init($url);
  //don't fetch the actual page, you only want to check the connection is ok
  curl_setopt($curl, CURLOPT_NOBODY, true);
  //do request
  $result = curl_exec($curl);
  $ret = false;
  //if request did not fail
  if ($result !== false) {
      //if request was ok, check response code
      $statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);  
      if ($statusCode == 200) {
          $ret = true;   
      }
  }
  curl_close($curl);
  return $ret;
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