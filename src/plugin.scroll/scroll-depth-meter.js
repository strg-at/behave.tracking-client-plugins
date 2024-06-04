/**
 * @class strgBeHave/tracking/plugin/scroll/ScrollDepthMeter
 */

import { throttle } from '../util/throttle'

export class ScrollDepthMeter {
  constructor(DOMNode, { id, eventKey, value = null, gaugePointInterval }, callbacks, BREAKPOINT_EVENT, DEFAULTS) {
    this.DOMNode = DOMNode
    this.id = id
    this.eventKey = eventKey
    this.value = value
    this.gaugePointInterval = gaugePointInterval || DEFAULTS.GAUGE_POINT_INTVERVAL

    this.BREAKPOINT_EVENT = BREAKPOINT_EVENT
    this.callbacks = callbacks
    this.DEFAULTS = DEFAULTS

    this.gaugePoints = []
    this.trackedGaugePoints = {}

    this.updateGaugePoints()

    this.scrollHandler = throttle(this.trackGaugePoints.bind(this), DEFAULTS.THROTTLE_DELAY)
    global.addEventListener('scroll', this.scrollHandler)
    global.addEventListener('resize', this.scrollHandler)
    this.scrollHandler()
  }

  trackGaugePoints() {
    const rect = this.DOMNode.getBoundingClientRect()
    this.updateGaugePoints()
    if (!this.isRectVisible(rect)) {
      return false
    }
    const viewPortHeight = global.innerHeight || document.documentElement.clientHeight
    const scrollDepthPixelsBottom = rect.height
      ? Math.max(0, Math.min(viewPortHeight - rect.top, rect.height))
      : Math.max(0, Math.min(viewPortHeight - rect.top, 1))
    this.gaugePoints
      .filter((gp) => gp && gp[0] <= scrollDepthPixelsBottom)
      .forEach((gp) => {
        if (this.trackedGaugePoints[gp[1]]) return
        const event = {
          key: this.eventKey,
          value: gp[1],
          time: Date.now(),
        }
        this.callbacks[this.BREAKPOINT_EVENT].forEach((callback) => callback(event))
        this.trackedGaugePoints[gp[1]] = true
      })

    if (this.gaugePoints.length === 0) {
      global.removeEventListener('scroll', this.scrollHandler)
      global.removeEventListener('resize', this.scrollHandler)
    }
  }

  updateGaugePoints() {
    const rect = this.DOMNode.getBoundingClientRect()
    const interval = this.gaugePointInterval
    const result = []
    let percent
    let i
    for (i = interval; i <= 100; i += interval) {
      percent = i / 100
      result.push([rect.height * percent, percent * 100])
    }
    if (i !== 100 + interval) {
      result.push([rect.height, 100])
    }
    this.gaugePoints = result
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
