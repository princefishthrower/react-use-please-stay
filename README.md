# react-use-please-stay

The classic JQuery functionality that brought a flashing document message and / or flashing favicon, ported to a React hook!

Install and save this as a dependency:

```bash
npm install --save react-use-please-stay
```

Import with:

```tsx
import { usePleaseStay } from 'react-use-please-stay'
```

Minimal example, passing the single required argument `messages`:

```tsx
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
```

Iterate through multiple messages:

```tsx
usePleaseStay(["Don't go!", "We have React hooks!", "We're sad!", "Come back!"])
```

Specify a slower iteration time in milliseconds (default is 1000):

```tsx
usePleaseStay(["Don't go!", "We have React hooks!", "We're sad!", "Come back!"], 3000)
```

Specify a slower iteration time in milliseconds (default is 1000):

```tsx
usePleaseStay(["Don't go!", "We have React hooks!", "We're sad!", "Come back!"], 3000)
```

That's about it for all possible configurations. Just remember that since this hook interacts with `document.title` it should only be called once in your app, for example in a layout or `App` component.