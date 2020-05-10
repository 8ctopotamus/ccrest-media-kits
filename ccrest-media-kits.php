<?php
/*
  Plugin Name: cCrest Media Kits
  Plugin URI:  https://github.com/8ctopotamus/ccrest-media-kits
  Description: A media repository for Cedarcrest Ice Cream.
  Version:     1.0
  Author:      @8ctopotamus
  Author URI:  https://github.com/8ctopotamus
  License:     GPL2
  License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

define('PLUGIN_SLUG', 'ccrest-media-kits');

include( plugin_dir_path( __FILE__ ) . 'inc/cpt.php' );
include( plugin_dir_path( __FILE__ ) . 'inc/functions.php' );
include( plugin_dir_path( __FILE__ ) . 'inc/shortcode.php' );
include( plugin_dir_path( __FILE__ ) . 'inc/init.php' );
