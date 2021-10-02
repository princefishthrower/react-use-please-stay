import { useRef, useEffect } from 'react'

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return
    }

    // Don't schedule if it is already scheduled
    if((window as any).IS_TITLE_CHANGE_RUNNING) {
      console.warn('An animation for your document title/fav icon is already running');
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);
    (window as any).IS_TITLE_CHANGE_RUNNING = true;

    return () => {
      clearInterval(id);
      (window as any).IS_TITLE_CHANGE_RUNNING = false;
    }
  }, [delay])
} 
