# React Hooks to npm boilerplate

This repository is a boilerplate for creating custom hooks that we can publish to as npm packages. 

There is a quick tutorial, it assumes an understanding of hooks and tests. 

## First things first

Firstly, go over to package.json file and amend name, description and author keys.

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


