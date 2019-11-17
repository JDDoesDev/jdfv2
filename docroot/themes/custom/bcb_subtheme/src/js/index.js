import scrollTriggers from 'scroll-triggers'

/**
 * @file
 * Drupal's batch API.
 */

(function($, Drupal) {
  /**
   * Attaches the batch behavior to progress bars.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.batch = {
    attach(context, settings) {
      scrollTriggers([
        {
          el: '.something'
        }
      ])
    }
  }
})(jQuery, Drupal)
