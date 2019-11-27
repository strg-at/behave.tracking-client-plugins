/**
 * @module strgBeHave/tracking/plugin/url
 */
export function createUrlTracking (config) {
  global[config.NAMESPACE] = global[config.NAMESPACE] || []

  const getUriFromLocation = function () {
    const port = global.location.port ? `:${global.location.port}` : ''
    return `${global.location.protocol}//${global.location.hostname}${$port}${global.location.pathname}`
  }

  return {
    track() {
      global[config.NAMESPACE].push({
        key: 'url',
        value: getUriFromLocation(),
        time: Date.now(),
      })
    },
    getUriFromLocation,
  }
}
