import React from 'react';
import { useState } from 'react';
import { AnimationType, usePleaseStay } from 'react-use-please-stay';
import { CodeHighlighter } from './CodeHighlighter';

function App() {
  const [titles, setTitles] = useState<Array<string>>([
    'Whoa! Redux Favicon?!',
    'React App',
  ]);
  const [intervalTime, setIntervalTime] = useState<number>(1000);
  const [animationType, setAnimationType] = useState<AnimationType>(
    AnimationType.LOOP,
  );
  const [faviconLinks, setFaviconLinks] = useState<Array<string>>([
    'https://redux.js.org/img/favicon/favicon.ico',
  ]);
  const [alwaysRunAnimations, setAlwaysRunAnimations] = useState<boolean>(false);

  usePleaseStay({
    titles,
    interval: intervalTime,
    animationType,
    faviconLinks,
    alwaysRunAnimations,
  });

  const code = `usePleaseStay({
    titles: [
      ${titles.map((title) => `"${title}"`).join(',\n      ')}
    ],
    interval: ${intervalTime},
    animationType: Animation.${animationType},
    faviconLinks: [
      ${faviconLinks
      .map((faviconLink) => `"${faviconLink}"`)
      .join(',\n      ')}
    ],
    alwaysRunAnimations: ${alwaysRunAnimations.toString()}
})`;

// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and Internet Explorer 10+.
// Internet Explorer: The clipboard feature may be disabled by
// an administrator. By default a prompt is shown the first
// time the clipboard is used (per session).
const copyToClipboard = (text: string) => {
  if ((window as any).clipboardData && (window as any).clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return (window as any).clipboardData.setData("Text", text);
  }
  else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      const textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      }
      catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
      }
      finally {
          document.body.removeChild(textarea);
      }
  }
}

  return (
    <div className="container my-5">
      <h1>usePleaseStay</h1>
      <p>Copy and paste this code right into your component:</p>
      <CodeHighlighter code={code} language="tsx" />
      <button className="btn btn-primary" onClick={() => copyToClipboard(code)}>Copy</button>
      <h2>Options</h2>
      <form>
        <pre className="font-weight-bold">titles</pre>
        <small>(Comma separated)</small>
        <div className="form-group">
          <textarea
            className="form-control"
            value={titles}
            onChange={(event) => setTitles(event.target.value.split(','))}
          ></textarea>
        </div>
        <pre className="font-weight-bold">interval</pre>
        <div className="form-group">
          <input
            className="form-control"
            value={intervalTime}
            type="number"
            onChange={(event) => {
              const value = parseInt(event.target.value);
              if (value) {
                setIntervalTime(value);
              }
            }}
          ></input>
        </div>
        <pre className="font-weight-bold">animationType</pre>
        <div className="form-check form-check-inline">
          <input
            id="loop"
            className="form-check-input"
            checked={animationType === AnimationType.LOOP}
            onChange={() => setAnimationType(AnimationType.LOOP)}
            type="radio"
            value={AnimationType.LOOP}
            name="animationType"
          />{' '}
          <label className="form-check-label" htmlFor="loop">
            <pre className="mb-0 mr-5">AnimationType.LOOP</pre>
          </label>
          <input
            id="cascade"
            className="form-check-input"
            checked={animationType === AnimationType.CASCADE}
            onChange={() => setAnimationType(AnimationType.CASCADE)}
            type="radio"
            value={AnimationType.CASCADE}
            name="animationType"
          />{' '}
          <label className="form-check-label" htmlFor="cascade">
            <pre className="mb-0 mx-1">AnimationType.CASCADE</pre>
          </label>
        </div>
        <pre className="font-weight-bold">faviconLinks</pre>
        <small>(Comma separated)</small>
        <div className="form-group">
          <textarea
            id="faviconLinks"
            className="form-control"
            value={faviconLinks}
            onChange={(event) => setFaviconLinks(event.target.value.split(','))}
          ></textarea>
          <p>Try some of these:</p>
          <p>Redux Favicon: https://redux.js.org/img/favicon/favicon.ico</p>
          <p>Gatsby Favicon: https://www.gatsbyjs.com/favicon-32x32.png</p>
          <p>Electron Favicon: https://www.electronjs.org/images/favicon.b7a59262df48d6563400baf5671da548.ico</p>
        </div>
        <pre className="font-weight-bold">alwaysRunAnimations</pre>
        <div className="form-check form-check-inline">
          <input
            id="animationType"
            className="form-check-input"
            onChange={() => setAlwaysRunAnimations(!alwaysRunAnimations)}
            type="checkbox"
            checked={alwaysRunAnimations}
            name="animationType"
          />
          <label className="form-check-label" htmlFor="animationType">
            <pre className="mb-0 mr-5">{alwaysRunAnimations.toString()}</pre>
          </label>
        </div>
      </form>
    </div>
  );
}

export default App;
