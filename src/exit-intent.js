import throttle from 'lodash/throttle'

export default function ExitIntent (options = {}) {
  const defaultOptions = {
    edges: {top: true, right: false, bottom: false, left: false},
    threshold: 20,
    maxDisplays: 1,
    eventThrottle: 200,
    onExitIntent: () => {}
  }

  return (function () {
    const config = {
      ...defaultOptions,
      ...options,
      edges: {...defaultOptions.edges, ...options.edges}
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
        config.edges.top &&
        y <= config.threshold &&
        displays < config.maxDisplays
      ) {
        displays++
        return 'top'
      }

      if (
        config.edges.right &&
        x >= viewportWidth() - config.threshold &&
        displays < config.maxDisplays
      ) {
        displays++
        return 'right'
      }

      if (
        config.edges.bottom &&
        y >= viewportHeight() - config.threshold &&
        displays < config.maxDisplays
      ) {
        displays++
        return 'bottom'
      }

      if (
        config.edges.left &&
        x <= config.threshold &&
        displays < config.maxDisplays
      ) {
        displays++
        return 'left'
      }

      return false
    }

    const mouseDidMove = (event) => {
      const side = shouldDisplay(event.clientX, event.clientY)
      if (side) {
        config.onExitIntent({
          side,
          position: {
            x: event.clientX,
            y: event.clientY
          }
        })
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
