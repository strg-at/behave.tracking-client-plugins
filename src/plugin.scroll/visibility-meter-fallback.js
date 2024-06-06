/**
 * @module strgBeHave/tracking/plugin/scroll/VisibilityMeterFallback
 */

import { throttle } from '../util/throttle'

export class VisibilityMeterFallback {
  constructor(DOMNode, { eventKey, eventValue, callbacks, VISIBILITY_EVENT, DEFAULTS }) {
    this.eventKey = eventKey
    this.eventValue = eventValue
    this.DOMNode = DOMNode
    this.callbacks = callbacks
    this.VISIBILITY_EVENT = VISIBILITY_EVENT
    this.DEFAULTS = DEFAULTS

    this.scrollHandler = throttle(this.trackVisibility.bind(this), DEFAULTS.THROTTLE_DELAY)

    global.addEventListener('scroll', this.scrollHandler)
    global.addEventListener('resize', this.scrollHandler)

    this.scrollHandler()
  }

  trackVisibility() {
    const rect = this.DOMNode.getBoundingClientRect()
    if (this.isRectVisible(rect)) {
      const event = {
        key: this.eventKey,
        value: this.eventValue,
        time: Date.now(),
      }
      this.callbacks[this.VISIBILITY_EVENT].forEach((callback) => callback(event))
      global.removeEventListener('scroll', this.scrollHandler)
      global.removeEventListener('resize', this.scrollHandler)
    }
  }

  isRectVisible(rect) {
    return (
      this.DOMNode.offsetParent !== null &&
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= (global.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (global.innerWidth || document.documentElement.clientWidth)
    )
  }

  unbind() {
    global.removeEventListener('scroll', this.scrollHandler)
    global.removeEventListener('resize', this.scrollHandler)
  }
}
