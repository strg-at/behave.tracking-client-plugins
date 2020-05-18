/**
 * @module strgBeHave/tracking/plugin/url
 */
export function createUrlTracking (config) {
  const URL_EVENT = 'url'

  const getUriFromLocation = function () {
    const port = global.location.port ? `:${global.location.port}` : ''
    return `${global.location.protocol}//${global.location.hostname}${port}${global.location.pathname}`
  }

  return {
    on(event, callback) {
      if (event !== URL_EVENT) return
      // only happens once so no need to create a real eventListener functionality
      callback({
        key: URL_EVENT,
        value: getUriFromLocation(),
        time: Date.now(),
      })
    },
    getUriFromLocation,
  }
}
