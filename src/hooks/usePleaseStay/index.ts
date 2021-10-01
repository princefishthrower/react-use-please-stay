import { useEffect, useRef, useState } from 'react';
import { getFavicon } from '../../helpers/getFavicon';
import { AnimationType } from '../../enums/AnimationType';
import { UsePleaseStayOptions } from '../../types/UsePleaseStayOptions';
import { useInterval } from '../useInterval';
import { convertToBase64 } from '../../util/convertToBase64';

export const usePleaseStay = ({
  titles,
  animationType = AnimationType.LOOP,
  interval = 1000,
  faviconURIs = [],
  alwaysRunAnimations = false,
}: UsePleaseStayOptions): void => {
  if (animationType === AnimationType.CASCADE && titles.length > 1) {
    console.warn(
      `You are using animation type '${animationType}' but passed more than one title in the titles array. Only the first title will be used.`,
    );
  }

  // State vars
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);

  // On cascade mode, we substring at the first character (0, 1).
  // Otherwise start at the first element in the titles array.
  const [titleIndex, setTitleIndex] = useState<number>(0);
  const [faviconIndex, setFaviconIndex] = useState<number>(0);
  const [isAppendMode, setIsAppendMode] = useState<boolean>(true);
  const [faviconURIsState, setFaviconURIsState] = useState<Array<string>>([]);

  // Ref vars
  const originalDocumentTitle = useRef<string>();
  const originalFaviconHref = useRef<string>();
  const faviconRef = useRef<HTMLLinkElement>();

  // Handler for visibility change - only needed when alwaysRunAnimations is false
  const handleVisibilityChange = () => {
    document.visibilityState === 'visible'
      ? restoreDefaults()
      : setShouldAnimate(true);
  };

  // The logic to modify the document title in cascade mode.
  const runCascadeLogic = () => {
    document.title = titles[0].substring(0, titleIndex);
    setTitleIndex(isAppendMode ? titleIndex + 1 : titleIndex - 1);
    if (titleIndex === titles[0].length - 1 && isAppendMode) {
      setIsAppendMode(false);
    }
    if (titleIndex - 1 === 0 && !isAppendMode) {
      setIsAppendMode(true);
    }
  };

  // The logic to modify the document title in loop mode.
  const runLoopLogic = () => {
    document.title = titles[titleIndex];
    setTitleIndex(titleIndex === titles.length - 1 ? 0 : titleIndex + 1);
  };

  // The logic to modify the document title.
  const modifyDocumentTitle = () => {
    switch (animationType) {
      // Cascade letters in the title
      case AnimationType.CASCADE:
        runCascadeLogic();
        return;
      // Loop over titles
      case AnimationType.LOOP:
      default:
        runLoopLogic();
        return;
    }
  };

  // The logic to modify the favicon.
  const modifyFavicon = () => {
    if (faviconRef && faviconRef.current) {
      faviconRef.current.href = faviconURIsState[faviconIndex];
      setFaviconIndex(
        faviconIndex === faviconURIsState.length - 1 ? 0 : faviconIndex + 1,
      );
    }
  };

  // The logic to restore default title and favicon.
  const restoreDefaults = () => {
    setShouldAnimate(false);
    setTimeout(() => {
      if (
        faviconRef &&
        faviconRef.current &&
        originalDocumentTitle.current &&
        originalFaviconHref.current
      ) {
        document.title = originalDocumentTitle.current;
        faviconRef.current.href = originalFaviconHref.current;
      }
    }, interval);
  };

  // On mount of this hook, save current defaults of title and favicon. also add the event listener. on un mount, remove it
  useEffect(() => {
    // make sure to store originals via useRef
    const favicon = getFavicon();
    if (favicon === undefined) {
      console.warn('We could not find a favicon in your application.');
      return;
    }
    // save originals - these are not to be manipulated
    originalDocumentTitle.current = document.title;
    originalFaviconHref.current = favicon.href;
    faviconRef.current = favicon;

    // Store favicons in localStorage if they are external URIs
    // TODO: cache invalidation?
    let externalFavicons: string[] = [];
    const cachedFavicons = Object.entries(localStorage).filter(key => key.indexOf('usePleaseStayFavicon-') != -1);
    if (!cachedFavicons) {
      externalFavicons = faviconURIs.filter(f => /^(http|https):\/\/[^ "]+$/.test(f) && convertToBase64(f).then(faviconBlob => faviconBlob));
      externalFavicons.forEach((f, index) => localStorage.setItem(`usePleaseStayFavicon-${index}`, f));
    }

    faviconRef.current.href = localStorage.getItem('usePleaseStayFavicon-0');
    faviconURIs.push(...externalFavicons);

    // Build faviconLinksState
    // Append current favicon href, since this is needed for an expected favicon toggle or animation pattern
    setFaviconURIsState([...faviconURIs, favicon.href]);

    // also add visibilitychange event listener
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // State change effects
  useEffect(() => {
    // Change in alwaysRunAnimations change the shouldAnimate value
    setShouldAnimate(alwaysRunAnimations);

    // Update title index
    setTitleIndex(animationType === AnimationType.CASCADE ? 1 : 0);
  }, [animationType, alwaysRunAnimations]);

  // Change title and favicon at specified interval
  useInterval(
    () => {
      modifyDocumentTitle();
      // this is 1 because we append the existing favicon on mount - see above
      faviconURIsState.length > 1 && modifyFavicon();
    },
    shouldAnimate ? interval : null,
  );
};
