import { getUriFromLocation } from './util/url'

/**
 * @module strgBeHave/tracking/plugin/url
 */
export function createUrlTracking (config) {
  global[config.NAMESPACE] = global[config.NAMESPACE] || []

  return {
    trackUrlFromLocation() {
      global[config.NAMESPACE].push({
        key: 'url',
        value: getUriFromLocation(),
        time: Date.now(),
      })
    }
  }
}
