<?php
/**
 * @file
 * Theme settings.
 */

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function bcb_subtheme_form_system_theme_settings_alter(&$form, FormStateInterface $form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  $form['header'] = array(
    '#type' => 'details',
    '#title' => t('Site header'),
    '#group' => 'bootstrap',
  );

  $article_fields = \Drupal::entityManager()->getFieldDefinitions('node', 'article');
  $image_fields = array();

  if (!empty($article_fields)) {
    foreach ($article_fields as $field_name => $field) {

      if ($field->getType() !== 'image') {
        unset($article_fields[$field_name]);
      }
      else {
        $image_fields[$field_name] = $field->getLabel();
      }
    }
  }

  $fields = (array) array_merge(array('none' => t('-- Select --')), $image_fields);

  $form['header']['bcb_subtheme_header_image'] = array(
    '#type' => 'select',
    '#title' => t('Header image'),
    '#options' => $fields,
    '#description' => t('Big image for nodes, display in header. The field must be created for all types of material.'),
    '#default_value' => theme_get_setting('bcb_subtheme_header_image'),
  );

  $default_url = Url::fromUri('base:' . drupal_get_path('theme', 'bcb_subtheme') . '/images/home-bg.jpg')->setAbsolute()->toString();

  $form['header']['bcb_subtheme_header_default'] = array(
    '#type' => 'textfield',
    '#title' => t('Default header image'),
    '#description' => t('This is the default image.'),
    '#default_value' => theme_get_setting('bcb_subtheme_header_default') ?: $default_url,
  );

  $form['social_buttons'] = array(
    '#type' => 'details',
    '#title' => t('Social buttons'),
    '#group' => 'bootstrap',
  );

  $social_networks = [
    'facebook' => t('Facebook'),
    'twitter' => t('Twitter'),
    'github' => t('Github'),
    'drupal' => t('Drupal'),
    'instagram' => t('Instagram'),
    'flickr' => t('Flickr'),
    'reddit' => t('Reddit'),
    'linkedin' => t('LinkedIn'),
  ];

  foreach ($social_networks as $key => $name) {
    $key_name = 'bcb_subtheme_social_' . $key;

    $form['social_buttons'][$key_name] = array(
      '#type' => 'textfield',
      '#title' => $name,
      '#default_value' => theme_get_setting($key_name),
    );
  }
}
