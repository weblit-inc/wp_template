<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="initial-scale=1.0, width=device-width">
  <title><?php wp_title('|', true, 'right') . bloginfo('name') ?></title>
  <?php echo do_shortcode('[add_my_head_assets]'); ?>
  <?php wp_head(); ?>
</head>

<body>
<header id="js-header">
</header>

<main>
