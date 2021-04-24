import React from 'react';
import { useState } from 'react';
import { AnimationType, usePleaseStay } from 'react-use-please-stay';

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

  return (
    <>
      <h1>usePleaseStay</h1>
      <pre style={{ whiteSpace: 'pre-wrap', background: 'lightgray' }}>
        usePleaseStay({'{'}
        <br />
        &nbsp;&nbsp;titles: [{titles.map((title) => `"${title}"`).join(', ')}],
        <br />
        &nbsp;&nbsp;interval: {intervalTime},<br />
        &nbsp;&nbsp;animationType: Animation.{animationType},<br />
        &nbsp;&nbsp;faviconLinks: [
        {faviconLinks.map((faviconLink) => `"${faviconLink}"`).join(', ')}],
        <br />
        &nbsp;&nbsp;alwaysRunAnimations: {alwaysRunAnimations.toString()}
        <br />
        {'}'});
      </pre>
      <div>
        <label>
          <pre style={{ display: 'inline' }}>titles</pre> (comma separated)
        </label>
        <textarea
          value={titles}
          onChange={(event) => setTitles(event.target.value.split(','))}
        ></textarea>
      </div>
      <div>
        <label>
          <pre style={{ display: 'inline' }}>interval</pre>
        </label>
        <input
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
      <div>
        <label>
          <pre style={{ display: 'inline' }}>animationType</pre>
        </label>
        <input
          checked={animationType === AnimationType.LOOP}
          onChange={() => setAnimationType(AnimationType.LOOP)}
          type="radio"
          value={AnimationType.LOOP}
          name="animationType"
        />{' '}
        <pre>AnimationType.LOOP</pre>
        <input
          checked={animationType === AnimationType.CASCADE}
          onChange={() => setAnimationType(AnimationType.CASCADE)}
          type="radio"
          value={AnimationType.CASCADE}
          name="animationType"
        />{' '}
        <pre>AnimationType.CASCADE</pre>
      </div>
      <div>
        <label>
          <pre style={{ display: 'inline' }}>faviconLinks</pre> (comma separated)
        </label>
        <textarea
          value={faviconLinks}
          onChange={(event) => setFaviconLinks(event.target.value.split(','))}
        ></textarea>
        <p>Examples:</p>
        <p>Redux Favicon: https://redux.js.org/img/favicon/favicon.ico</p>
        <p>Gatsby Favicon: https://www.gatsbyjs.com/favicon-32x32.png</p>
      </div>
      <div>
        <label>
          <pre style={{ display: 'inline' }}>alwaysRunAnimations</pre>
        </label>
        <input
          onChange={() => setAlwaysRunAnimations(!alwaysRunAnimations)}
          type="checkbox"
          checked={alwaysRunAnimations}
          name="animationType"
        />
      </div>
    </>
  );
}

export default App;
