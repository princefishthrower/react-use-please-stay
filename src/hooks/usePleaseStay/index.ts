import { useEffect, useState } from 'react';
import { useInterval } from '../useInterval';
import { getFavicon } from '../../helpers/getFavicon';
import { AnimationType } from '../../enums/AnimationType';
import { UsePleaseStayOptions } from '../../types/UsePleaseStayOptions';

export const usePleaseStay = ({messages, animationType = AnimationType.MESSAGES, delay = 1000, faviconHref}: UsePleaseStayOptions): void => {

  if ((animationType === AnimationType.BLINK || animationType === AnimationType.CASCADE) && messages.length > 1) {
    console.warn(`You are using animation type '${animationType}' but passed more than one message in the messages array. Only the first message will be used.`)
  }

  const [shouldRunAnimation, setShouldRunAnimation] = useState<boolean>(false);
  const [messageIndex, setMessageIndex] = useState<number>(animationType === AnimationType.CASCADE ? 1 : 0);
  const [isAppendMode, setIsAppendMode] = useState<boolean>(true);

  // make sure to store originals
  const originalTitle = document.title;
  const favicon = getFavicon();
  const originalFaviconHref = favicon?.href;

  // handler for visibility change
  const handleVisibilityChange = () => {
    document.visibilityState === 'visible'
      ? restoreDefaults()
      : setShouldRunAnimation(true);
  };

  // on mount of this hook, add the event listener. on un mount, remove it
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useInterval(
    () => {
      modifyDocumentTitle();
      blinkFavicon();
    },
    shouldRunAnimation ? delay : null,
  );

  const modifyDocumentTitle = () => {
    switch (animationType) {
      // TODO: apparently you can't set an empty one
      case AnimationType.BLINK:
        document.title = messageIndex === 0 ? messages[messageIndex] : '';
        if (messageIndex === 1) {
          setMessageIndex(0);
        } else {
          setMessageIndex(1);
        }
        return;
      // cascade at letter level
      case AnimationType.CASCADE:
        document.title = messages[0].substring(0, messageIndex);
        setMessageIndex(isAppendMode ? messageIndex + 1 : messageIndex - 1);
        if (messageIndex + 1 === messages[0].length && isAppendMode) {
          setIsAppendMode(false);
        }
        if (messageIndex - 1 === 0 && !isAppendMode) {
          setIsAppendMode(true);
        }
        return;
      // standard message toggle (also default)
      case AnimationType.MESSAGES:
      default:
        document.title = messages[messageIndex];
        if (messageIndex < messages.length - 1) {
          setMessageIndex(messageIndex + 1);
        } else {
          setMessageIndex(0);
        }
        return;
    }
  };

  // blink favicon only if one is passed
  const blinkFavicon = () => {
    if (favicon && faviconHref && originalFaviconHref) {
      if (favicon.href === originalFaviconHref) {
        favicon.href = faviconHref;
      } else {
        favicon.href = originalFaviconHref;
      }
    }
  };

  // restore default title and favicon (if a faviconHref was passed)
  const restoreDefaults = () => {
    setShouldRunAnimation(false);
    setTimeout(() => {
      document.title = originalTitle;
      if (favicon && originalFaviconHref && faviconHref) {
        favicon.href = originalFaviconHref;
      }
    }, delay);
  };
};
