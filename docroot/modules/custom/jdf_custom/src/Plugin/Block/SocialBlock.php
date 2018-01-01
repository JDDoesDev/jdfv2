<?php

namespace Drupal\jdf_custom\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'SocialBlock' block.
 *
 * @Block(
 *  id = "social_block",
 *  admin_label = @Translation("Social block"),
 * )
 */
class SocialBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['social_block']['#markup'] = $this->socialLinks();

    return $build;
  }

  public function socialLinks() {
    $social_links = array_filter([
      'facebook' => theme_get_setting('bcb_subtheme_social_facebook'),
      'twitter' => theme_get_setting('bcb_subtheme_social_twitter'),
      'github' => theme_get_setting('bcb_subtheme_social_github'),
      'drupal' => theme_get_setting('bcb_subtheme_social_drupal'),
      'instagram' => theme_get_setting('bcb_subtheme_social_instagram'),
      'reddit' => theme_get_setting('bcb_subtheme_social_reddit'),
      'flickr' => theme_get_setting('bcb_subtheme_social_flickr'),
      'linkedin' => theme_get_setting('bcb_subtheme_social_linkedin'),
      'paypal' => 'http://paypal.me/JDDoesDev',
      'envelope' => '/contact',
    ]);

    $rendered = '<ul class="list-unstyled">';
    foreach ($social_links as $network => $link) {
      $rendered .= '<li>';
      $rendered .= '<a target="_blank" href="'. $link .'">';
      $rendered .= '<span class="fa-stack fa-lg">';
      $rendered .= '<i class="fa fa-circle fa-stack-2x"></i>';
      $rendered .= '<i class="fa fa-' . $network . ' fa-stack-1x fa-inverse"></i>';
      if ($network == 'envelope') {
        $network = 'Contact Me';
      }
      elseif ($network == 'paypal') {
        $network = 'Donate via PayPal';
      }
      $rendered .= '</span>'. ucfirst($network) . '</a></li>';
    }
    $rendered .= '</ul>';

    return $rendered;
  }
}
