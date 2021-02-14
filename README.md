# Exit Intent

[![version][version]](http://npm.im/exit-intent)
[![MIT License][mit license]](http://opensource.org/licenses/MIT)
[![Standard][standard]](http://standardjs.com)
[![Standard Version][standard version]](https://github.com/conventional-changelog/standard-version)
[![Size][size]](https://unpkg.com/exit-intent)
[![Size gzip][size gzip]](https://unpkg.com/exit-intent)

Exit Intent detection library.

## Usage

```js
import exitIntent from 'exit-intent';

// Initialise
const removeExitIntent = exitIntent({
  threshold: 50,
  maxDisplays: 2,
  eventThrottle: 100,
  onExitIntent: () => {
    console.log('exit-intent triggered');
  },
});

// Destroy
removeExitIntent();
```

### Options

`threshold` (default 20)  
maximum distance in pixels from the top of the page to trigger.

`maxDisplays` (default 1)  
maximum number of times to trigger.

`eventThrottle` (default 200)  
event throttle in milliseconds.

`onExitIntent` (default no-op function)  
function to call when an exit intent has been detected.

### License

MIT

[version]: https://img.shields.io/npm/v/exit-intent.svg
[mit license]: https://img.shields.io/npm/l/exit-intent.svg
[standard]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard version]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg
[size]: https://badges.herokuapp.com/size/npm/exit-intent
[size gzip]: https://badges.herokuapp.com/size/npm/exit-intent?gzip=true

originally based on https://github.com/richriscunha/Exitent
