/**
 * @module strgBeHave/tracking/plugin/scroll
 */

import { ScrollDepthMeter } from './scroll-depth-meter'
import { MultiNodeScrollDepthMeter } from './multi-node-scroll-depth-meter'
import { VisibilityMeter } from './visibility-meter'
import { VisibilityMeterFallback } from './visibility-meter-fallback'

export function createScrollTracking() {
  const BREAKPOINT_EVENT = 'breakpoint'
  const VISIBILITY_EVENT = 'visibility'

  const callbacks = {
    breakpoint: [],
    visibility: [],
  }

  const DEFAULTS = {
    THROTTLE_DELAY: 200,
    GAUGE_POINT_INTVERVAL: 25,
  }

  return {
    visibility(selector, { eventKey, eventValue = 1, visibilityThreshold }) {
      const DOMNode = typeof selector === 'string' ? document.querySelector(selector) : selector
      if ('IntersectionObserver' in global) {
        return new VisibilityMeter(DOMNode, {
          eventKey,
          eventValue,
          visibilityThreshold,
          callbacks,
          VISIBILITY_EVENT,
        })
      }
      return new VisibilityMeterFallback(DOMNode, {
        eventKey,
        eventValue,
        visibilityThreshold,
        callbacks,
        VISIBILITY_EVENT,
      })
    },
    scrollDepth(selector, { eventKey, gaugePointInterval = null }) {
      const DOMNode = typeof selector === 'string' ? document.querySelector(selector) : selector
      return new ScrollDepthMeter(
        DOMNode,
        {
          eventKey,
          gaugePointInterval,
        },
        callbacks,
        BREAKPOINT_EVENT,
        DEFAULTS
      )
    },
    multiNodeScrollDepth(domNodes, { eventKey, gaugePointInterval = null }) {
      if (!Array.isArray(domNodes) || domNodes.some((node) => !(node instanceof Element))) {
        throw new Error('domNodes must be a list of DOM nodes')
      }
      return new MultiNodeScrollDepthMeter(
        domNodes,
        {
          eventKey,
          gaugePointInterval,
        },
        callbacks,
        BREAKPOINT_EVENT,
        DEFAULTS
      )
    },
    on(event, callback) {
      if (!callbacks[event]) return
      callbacks[event].push(callback)
    },
  }
}
