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

  public $socialLinkItems;

  /**
   * {@inheritdoc}
   */
  public function build() {
    $this->setSocialLinkItems();
    $build = [];
    $build['social_block']['#markup'] = $this->socialLinks();

    return $build;
  }

  public function setSocialLinkItems() {
    $this->socialLinkItems = array_filter([
      'twitter' => [theme_get_setting('bcb_subtheme_social_twitter'), 'fab'],
      'github' => [theme_get_setting('bcb_subtheme_social_github'), 'fab'],
      'drupal' => [theme_get_setting('bcb_subtheme_social_drupal'), 'fab'],
      'linkedin' => [theme_get_setting('bcb_subtheme_social_linkedin'), 'fab'],
      'paypal' => ['http://paypal.me/JDDoesDev', 'fab'],
      'patreon' => ['https://www.patreon.com/jddoesthings', 'fab'],
      'envelope' => ['/contact', 'fas'],
    ]);
  }

  public function socialLinks() {

    $rendered = '<ul class="list-unstyled">';
    foreach ($this->socialLinkItems as $network => $link) {
      $rendered .= '<li>';
      $rendered .= '<a target="_blank" href="' . $link[0] . '">';
      $rendered .= '<span class="fa-stack fa-lg">';
      $rendered .= '<i class="fas fa-circle fa-stack-2x"></i>';
      $rendered .= '<i class="' . $link[1] . ' fa-' . $network . ' fa-stack-1x fa-inverse"></i>';
      switch ($network) {
        case 'envelope':
          $network = 'Contact Me';
          break;

        case 'paypal':
          $network = 'Donate via PayPal';
          break;

        case 'patreon':
          $network = 'Support me on Patreon';
          break;

        default:
          break;
      }
      $rendered .= '</span>' . ucfirst($network) . '</a></li>';
    }
    $rendered .= '</ul>';

    return $rendered;
  }

}
