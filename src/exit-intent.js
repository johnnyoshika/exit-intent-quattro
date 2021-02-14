import throttle from 'lodash/throttle'

export default function ExitIntent (options = {}) {
  const defaultOptions = {
    sides: {top: true, right: false, bottom: false, left: false},
    threshold: 20,
    maxDisplays: 1,
    eventThrottle: 200,
    onExitIntent: () => {}
  }

  return (function () {
    const config = {
      ...defaultOptions,
      ...options,
      sides: {...defaultOptions.sides, ...options.sides}
    }
    const eventListeners = new Map()
    let displays = 0

    const addEvent = (eventName, callback) => {
      document.addEventListener(eventName, callback, false)
      eventListeners.set(`document:${eventName}`, {
        eventName,
        callback
      })
    }

    const removeEvent = (key) => {
      const {eventName, callback} = eventListeners.get(key)
      document.removeEventListener(eventName, callback)
      eventListeners.delete(key)
    }

    const shouldDisplay = (x, y) => {
      if (
        config.sides.top &&
        y <= config.threshold &&
        displays < config.maxDisplays
      ) {
        displays++
        return true
      }

      if (
        config.sides.right &&
        x >= viewportWidth() - config.threshold &&
        displays < config.maxDisplays
      ) {
        displays++
        return true
      }

      if (
        config.sides.bottom &&
        y >= viewportHeight() - config.threshold &&
        displays < config.maxDisplays
      ) {
        displays++
        return true
      }

      if (
        config.sides.left &&
        x <= config.threshold &&
        displays < config.maxDisplays
      ) {
        displays++
        return true
      }

      return false
    }

    const mouseDidMove = (event) => {
      if (shouldDisplay(event.clientX, event.clientY)) {
        config.onExitIntent()
        if (displays >= config.maxDisplays) {
          removeEvents()
        }
      }
    }

    const removeEvents = () => {
      eventListeners.forEach((value, key, map) => removeEvent(key))
    }

    // Viewport size: https://stackoverflow.com/a/8876069/188740
    const viewportWidth = () =>
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )
    const viewportHeight = () =>
      Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      )

    addEvent('mousemove', throttle(mouseDidMove, config.eventThrottle))

    return removeEvents
  })()
}
