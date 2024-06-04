/**
 * @module strgBeHave/tracking/plugin/scroll/VisibilityMeter
 */

export class VisibilityMeter {
  constructor(
    DOMNode,
    {
      eventKey,
      eventValue,
      visibilityThreshold = 65, // in percent %
    },
    callbacks,
    VISIBILITY_EVENT
  ) {
    this.eventKey = eventKey
    this.eventValue = eventValue
    this.visibilityThreshold = visibilityThreshold
    this.callbacks = callbacks
    this.VISIBILITY_EVENT = VISIBILITY_EVENT

    // Threshold for the callback, measuring every 10%
    const threshold = []
    for (let i = 0; i <= 1.0; i += 0.1) {
      threshold.push(i)
    }
    this.observer = new IntersectionObserver((entries) => this.observerCallback(entries), {
      root: null,
      rootMargin: '0px',
      threshold,
    })
    this.observer.observe(DOMNode)
  }

  observerCallback(entries) {
    const perc = entries[0].intersectionRatio * 100
    if (perc > this.visibilityThreshold) {
      const event = {
        key: this.eventKey,
        value: this.eventValue,
        time: Date.now(),
      }
      this.callbacks[this.VISIBILITY_EVENT].forEach((callback) => callback(event))
      this.observer.disconnect()
    }
  }

  unbind() {
    this.observer.disconnect()
  }
}
