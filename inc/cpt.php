<?php

function car_custom_posttype() {
  register_post_type('assets', array(
    'label' => __('Assets'),
    'singular_label' => __('Asset'),
    'public' => true,
    'show_ui' => true,
    'capability_type' => 'post',
    'hierarchical' => false,
    'rewrite' => array('slug' => 'assets'),
    'query_var' => false,
    'menu_icon' => 'dashicons-images-alt',
    'taxonomies' => array('post_tag', 'category'),
    'supports' => array('title', 'editor'),
  ));
  register_taxonomy_for_object_type('category', 'assets');
  register_taxonomy_for_object_type('post_tag', 'assets');
}
add_action('init', 'car_custom_posttype');