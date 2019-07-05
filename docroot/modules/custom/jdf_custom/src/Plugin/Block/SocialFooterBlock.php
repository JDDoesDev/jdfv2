<?php

namespace Drupal\jdf_custom\Plugin\Block;

use Drupal\jdf_custom\Plugin\Block\SocialBlock;

/**
 * Provides a 'SocialFooterBlock' block.
 *
 * @Block(
 *  id = "social_footer_block",
 *  admin_label = @Translation("Social footer block"),
 * )
 */
class SocialFooterBlock extends SocialBlock {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $this->setSocialLinkItems();

    $build = [];
    $build['social_footer_block']['#markup'] = $this->socialLinks();

    return $build;
  }

  public function socialLinks() {
    $rendered = '<ul class="list-inline text-center">';
    foreach ($this->socialLinkItems as $network => $link) {
      $rendered .= '<li class="list-inline-item">';
      $rendered .= '<a target="_blank" href="' . $link[0] . '">';
      $rendered .= '<i class="' . $link[1] . ' fa-' . $network . '"></i>';
      $rendered .= '</a>';
      $rendered .= '</li>';
    }
    $rendered .= '</ul>';

    return $rendered;
  }

}
