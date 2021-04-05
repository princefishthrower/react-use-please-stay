import React from 'react';
import { usePleaseStay } from 'react-use-please-stay'

function App() {
  usePleaseStay(["Don't go!", "We have React hooks!"])
  return (
    <>
      <h1>usePleaseStay()</h1>
      <p>An example of the usePleaseStay hook. Leaving this browser tab open, navigate or open another tab and watch the magic happen!</p>
    </>
  );
}

export default App;
