# BeHave Tracking Plugins
This library contains standard BeHave tracking plugins, it is intended to use the plugins in the customer implementations and not standalone, they require [BeHave Tracking Client Library](https://bitbucket.strg.at/projects/BHV/repos/tracking-client-lib)

## Getting Started

### Prerequisites
- [Node 10](https://nodejs.org/)
- [NPM 6.4.1](https://www.npmjs.com/)
<br>

## plugin.scroll.js
The library is better known as breakpointmeter, it tracks the scroll depth in combination with `BeHave Tracking Client Library`.
<br>

### How to use:

#### config
```javascript
const config = {
  NAMESPACE: 'test',
  ARTICLE_SELECTOR: 'article',
}
```
<br>

#### init
```javascript
import { createScrollTracking } from '@strg-behave/tracking-client-plugins'

const scrollTracking = createScrollTracking(config)
```
<br>

#### register
```javascript
const articleElement = [] // Cast to array and pick first found
  .concat(config.ARTICLE_SELECTOR)
  .map(selector => document.querySelector(selector))
  .filter(el => !!el)
  .shift()
if (articleElement) {
  scrollTracking.scrollDepth(articleElement, {
    eventKey: 'breakpoint.content.percent.max',
  })
}
```
<br>

## plugin.referrer.js
This plugin tracks the `window.referrer` URL

### How to use:

#### config
```javascript
const config = {
  NAMESPACE: 'test',
}
```
<br>

#### init
```javascript
import { createReferrerTracking } from '@strg-behave/tracking-client-plugins'

createReferrerTracking(config).track()
```
<br>

## plugin.url.js
This plugin tracks the `window.location` URL

### How to use:

#### config
```javascript
const config = {
  NAMESPACE: 'test',
}
```
<br>

#### init
```javascript
import { createUrlTracking } from '@strg-behave/tracking-client-plugins'

createScrollTracking(config).track()
```
<br>

## Development

### Installation
```bash
npm install
```
<br>

### Testing
```bash
npm run test
```
<br>

### Coverage Report
Starts an interactive http server on port `8888`.
```bash
npm run coverage

```
<br>

### ESLint
To check the code syntax integrity according to our ESLint specification run:
```bash
npm run lint
```

To autofix code syntax integrity run:
```bash
npm run lint:fix
```
<br>

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the tags on this repository.
<br>
To increase a version and tag in GIT run:
```bash
npm version major|minor|patch
```
<br>

## Authors
* **[Ralf Traunsteiner](mailto:ralf.traunsteiner@strg.at)** - *implementation*
