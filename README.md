# avast-client
...ya-harr!

![Avast](https://media.giphy.com/media/IExO5ZnJa0NB6/giphy.gif)

### Dependencies

- `node` (v4.1.x+) and `npm` (2.14.x+)
- (Development) global install of the following:
```
npm i --global webpack \
  webpack-dev-server \
  karma \
  protractor \
  typings \
  typescript
```

### Installing

```
npm i
# `typings install` will be run in the postinstall hook
```

### Running

Starting the development server

```
npm run server
# http://0.0.0.0:3000/
# or IPv6 http://[::1]:3000
```

Watch and build files

```
npm run watch
```

Running tests

````
npm run test
```

Starting the e2e webdriver

```
npm run webdriver:update
npm run webdriver:start
```

Running e2e tests

```
npm run e2e
```

### Building locally

```
# development
npm run build:dev

# production
npm run build:prod
```

### Building

```
docker build -t avast-client .
docker tag avast-client clusterducks/avast-client
```

### Generating Documentation

```
npm run docs
# located at `client/docs/index.html`
```
