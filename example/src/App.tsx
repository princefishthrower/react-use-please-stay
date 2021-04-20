import React from 'react';
import { AnimationType, usePleaseStay } from 'react-use-please-stay'

function App() {
  usePleaseStay(["123456789"], 100, AnimationType.CASCADE)
  return (
    <>
      <h1>usePleaseStay</h1>
      <p>An example of the usePleaseStay hook. Leaving this browser tab open, navigate or open another tab and watch the magic happen!</p>
    </>
  );
}

export default App;
