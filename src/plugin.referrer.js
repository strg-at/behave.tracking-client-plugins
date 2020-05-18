/**
 * @module strgBeHave/tracking/plugin/referrer
 */
export function createReferrerTracking () {
  const REFERRER_EVENT = 'referrer'

  const getReferrer = function () {
    if (!global.document.referrer) {
      return null
    }
    return global.document.referrer
  }

  return {
    on(event, callback) {
      if (event !== REFERRER_EVENT) return
      // only happens once so no need to create a real eventListener functionality
      callback({
        key: REFERRER_EVENT,
        value: getReferrer(),
        time: Date.now(),
      })
    }
  }
}
