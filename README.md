# React Hooks to npm boilerplate

This repository is a boilerplate for creating custom hooks that we can publish to NPM registry as packages.

I've put together a quick tutorial, it assumes an understanding of react, hooks and tests.

If something is not clear, message me or raise an issue, I will explain in more detail.

## First things first

Firstly, clone this repository. 

Next, go over to package.json file and amend name, description and author keys.

The package would be served on npm as per what you have typed in the "name".

You may want to use scoped naming i.e. "@myscope/use-my-hook"

More info: [https://docs.npmjs.com/using-npm/scope.html]

## How we will be able to use your package

It follows the common React path./
Follow through the included useCounter example and you will be fine./
Make sure to export your hook (I prefer named exports) in index.ts.

Basically you have to do two things:
a) write your hook (preferably test and type it)
b) export it in index.ts file
c) deploy to NPM

We will able to use your hook like so:

```
 import { useYourHook } from 'your-package-name'
```

## Development commands

```
 // watch
 yarn start

 // or
 npm run start
```

```
 // builds the dist folder
 yarn build

 // or
 npm run build
```

```
 // starts tests
 yarn test

 // or

 npm run test
```

## Local testing and yarn link

To local test the package, do the following:
Let's assume your package name is "use-my-counter"

a) in hook folder, run
```
yarn link
```
b) assuming you have a workspace, create a sample CRA app 
```
npx create-react-app my-app
```
c) navigate to your CRA app folder
```
cd my-app
```
d) run command
```
 yarn link use-my-counter
```
e)  In your CRA app, you can now do, it's linked locally 
```
  import { useMyCounter } from 'use-my-counter';
```

f) This will give you an error due to different copy of React and in CRA app. 
   To counter that let's assume that we have workspace
```
workspace
  - use-my-counter
  - my-app
```
  We navigate to use-my-counter and type (this will link the React versions locally)
  ```
   npm link ../my-app/node_modules/react
  ```
  We should be good to go to work locally. 

## Deployment to NPM

### Login to correct NPM account

```
npm login
```

### Versioning

Increase the version number as per NPM guides [https://docs.npmjs.com/about-semantic-versioning].

```
// increases the first digit i.e. from 0.5.4 to 1.0.0
npm version major

// increases the second digit i.e. from 0.0.3 to 0.1.0
npm version minor

// increases the third digit i.e. from 0.0.1 to 0.0.2
npm version patch
```

### Deployment

Run the command and the package should be up.

```
npm publish --access public
```
