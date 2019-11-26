# BeHave Tracking Plugin Scroll
This library contains the BeHave tracking client scroll plugin, it is intended to use it inside a client application integration and not standalone.

## Getting Started

### Prerequisites
- [Node 10](https://nodejs.org/)
- [NPM 6.4.1](https://www.npmjs.com/)
<br>

## Specification
The library is better known as breakpointmeter, it tracks the scroll depth in combination with `BeHave Tracking Client Library`.
<br>

## How to use

### config
```javascript
const config = {
  NAMESPACE: 'test',
}
```
<br>

### init
```javascript
import { createScrollTracking } from '@strg-behave/tracking-plugin-scroll'

const scrollTracking = createScrollTracking(config)
```
<br>

### register
```javascript
const articleSelector = 'article'
const articleElement = [] // Cast to array and pick first found
  .concat(articleSelector)
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
