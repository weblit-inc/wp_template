'use strict'

export const secureTargetBlankLinks = () => {
  const $anchors = document.querySelectorAll('a')

  $anchors.forEach(($anchor) => {
    if (
      $anchor.hasAttribute('target') &&
      $anchor.getAttribute('target') === '_blank'
    ) {
      $anchor.setAttribute('rel', 'noreferrer')
    }
  })
}
