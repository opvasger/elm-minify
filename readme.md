# Elm Minify 

Minify compiled Elm modules!

[![Elm-Minify v?](https://img.shields.io/npm/v/elm-minify.svg)](https://www.npmjs.com/package/elm-minify)

![](/example.gif)

## Get Started
The CLI is distributed through [NPM](https://www.npmjs.com/package/elm-minify). Here's how it works:

```bash
#1 install
npm i -g elm-minify

#2 compile. "--optimize" is important!
elm make --optimize --output=dist/main.js

#3 minify to "dist/main.min.js"
elm-minify dist/main.js
```
 
- `elm-minify` can be plugged into [Webpack](https://webpack.js.org/) using [this Node.js API](https://github.com/opvasger/elm-minify#nodejs-api)

- [Parcel](https://parceljs.org/) is another popular build tool, which has excellent integration for Elm out of the box - Minification is built-in.

- More optimizations for Elm can be found in [the official guide](https://guide.elm-lang.org/optimization/)

## CLI Config
The CLI has a number of flags to modify behavior, described here:

```bash
elm-minify --help
```

If it doesn't fit your needs or something isn't working, let me know with [a fresh issue](https://github.com/opvasger/elm-minify/issues/new)!

## Node.js API
This package exposes a node module from it's root. It gives programmatic access to `elm-minify` for various purposes described here:

### WebpackPlugin
```() => Webpack Plugin```

Plug `elm-minify` into [Webpack](https://webpack.js.org/). The plugin will, in production mode, detect when Webpack is loading files optimized with `elm-webpack-loader`, and minify their content before bundling. The overhead of using this compared to the CLI is ~600 bytes for my [examples](https://github.com/opvasger/elm-minify/tree/master/examples). The Webpack configuration can be found [here](https://github.com/opvasger/elm-minify/blob/master/examples/withWebpack/webpack.config.js).

### minify
```(elmJs : String) => String```

Minify compiled elm code synchronously

### terserConfig
`Terser Configuration`

Get the [Terser](https://github.com/terser-js/terser) configuration for mangling and compressing Elm code.