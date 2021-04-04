import { useEffect, useState } from 'react'
import { useInterval } from '../useInterval'
import { getFavicon } from '../../helpers/getFavicon'

export const usePleaseStay = (
  messages: Array<string>,
  delay: number = 1000,
  faviconToBlinkHref?: string
): void => {
  const [shouldRunToggler, setShouldRunToggler] = useState<boolean>(false)
  const [messageIndex, setMessageIndex] = useState<number>(0)

  // make sure to store originals
  const originalTitle = document.title
  const favicon = getFavicon()
  const originalFaviconHref = favicon?.href

  // handler for visibiliy change
  const handleVisiblilityChange = () => {
      document.visibilityState === "visible" ? restoreDefaults() : setShouldRunToggler(true)
  }

  // on mount of this hook, add the event listener. on unmount, remove it
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisiblilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisiblilityChange)
    }
  }, [])

  useInterval(
    () => {
      toggleDocumentTitle()
      blinkFavicon()
    },
    shouldRunToggler ? delay : null
  )

  const toggleDocumentTitle = () => {
    document.title = messages[messageIndex]
    if (messageIndex < messages.length - 1) {
      setMessageIndex(messageIndex + 1)
    } else {
      setMessageIndex(0)
    }
  }

  // blink favicon only if one is passed
  const blinkFavicon = () => {
    if (favicon && faviconToBlinkHref && originalFaviconHref) {
      if (favicon.href === originalFaviconHref) {
        favicon.href = faviconToBlinkHref
      } else {
        favicon.href = originalFaviconHref
      }
    }
  }

  // restore default title and favicon (if a faviconHref was passed)
  const restoreDefaults = () => {
    setShouldRunToggler(false)
    setTimeout(() => {
        document.title = originalTitle
        if (favicon && originalFaviconHref && faviconToBlinkHref) {
            favicon.href = originalFaviconHref
          }
    }, delay)
  }
}
