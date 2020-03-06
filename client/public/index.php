<?php
/**
 * Plugin Name page template (for React app)
 */

if (!is_user_logged_in()) {
  get_header();
  echo '<div id="site-content">';
  echo '<h1>You must be logged in to access the files.</h1>';
  wp_login_form(); 
  echo '</div>';
  get_footer();
} else { 
  get_header();
  ?>
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Asset Repository</title>
    </head>
    <body>
      <div id="root"></div>
      <!-- <script src="http://localhost:3000/static/js/bundle.js"></script> -->
    </body>
    </html>  
  <?php
  get_footer();
}