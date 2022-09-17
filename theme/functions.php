<?php
  function add_my_security() {
    remove_action('wp_head', 'wp_generator');

    function redirect_author_archive() {
      if (preg_match('/author=([0-9]*)/i', $_SERVER['QUERY_STRING'])) {
        wp_redirect(esc_url(home_url('/404.php')));
        exit;
      }
    }
    add_action('init', 'redirect_author_archive');
  }
  add_my_security();

  function enable_thumbnail() {
    add_theme_support('post-thumbnails');
  }
  add_action('after_setup_theme', 'enable_thumbnail');

  function esc_home_url($url) {
    echo esc_url(home_url($url));
  }

  function img_path($file) {
    echo get_theme_file_uri() . '/assets/images/' . $file;
  }

  function get_slug_name() {
    $page = get_post(get_the_ID());
    return $page->post_name;
  }

  function get_update_time($file) {
    date_default_timezone_set('Asia/Tokyo');
    return date('YmdHis', filemtime($file));
  }

  function add_my_stylesheet($file) {
    $file_root_path = get_template_directory() . '/assets/css/' . $file;

    if (file_exists($file_root_path)) {
      $file_path = get_theme_file_uri() . '/assets/css/' . $file;
      echo '<link rel="stylesheet" href="' . $file_path . '?' . get_update_time($file_root_path) . '">';
    }
  }

  function add_my_script($file) {
    $file_root_path = get_template_directory() . '/assets/js/' . $file;

    if (file_exists($file_root_path)) {
      $file_path = get_theme_file_uri() . '/assets/js/' . $file;
      echo '<script src="' . $file_path . '?' . get_update_time($file_root_path) . '"></script>';
    }
  }

  function sc_add_my_head_assets() {
    add_my_stylesheet('app.css');
  }
  add_shortcode('add_my_head_assets', 'sc_add_my_head_assets');

  function sc_add_my_footer_assets() {
    if (is_home() || is_front_page()) {
      add_my_script('home.min.js');
    } else if (is_single()) {
      add_my_script('single.min.js');
    } else if (is_page()) {
      add_my_script(get_slug_name() . '.min.js');
    }
  }
  add_shortcode('add_my_footer_assets', 'sc_add_my_footer_assets');
