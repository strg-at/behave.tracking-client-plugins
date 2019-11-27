/**
 * @module strgBeHave/tracking/plugin/referrer
 */
export function createReferrerTracking (config) {
  global[config.NAMESPACE] = global[config.NAMESPACE] || []

  const getReferrer = function () {
    if (!global.document.referrer) {
      return null
    }
    return global.document.referrer
  }

  return {
    track() {
      global[config.NAMESPACE].push({
        key: 'referrer',
        value: getReferrer(),
        time: Date.now(),
      })
    },
    getReferrer,
  }
}
