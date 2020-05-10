<?php

add_shortcode( PLUGIN_SLUG, 'ccrest_media_kits_shorcode_func' );
function ccrest_media_kits_shorcode_func( $atts ) {
	return '<div id="'.PLUGIN_SLUG.'"></div>';
}