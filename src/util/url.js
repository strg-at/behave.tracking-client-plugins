/**
 * Parse clean url without hashes and query params from location object
 * @param {Location} location - window.location object
 */
module.exports = {
  getCleanURI (location) {
    const port = (location.port ? ':' + location.port : '')
    return `${location.protocol}//${location.hostname}${$port}${location.pathname}`
  }
}
