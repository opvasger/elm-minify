# Elm Minify 

Minify compiled Elm modules!

[![Elm-Minify v?](https://img.shields.io/npm/v/elm-minify.svg)](https://www.npmjs.com/package/elm-minify)

![](/example.gif)

## Get Started
The CLI is distributed through [NPM](https://www.npmjs.com/package/elm-minify):

```bash
npm i -g elm-minify
```

Here is how it works:

1. Compile your Elm module:

```bash
elm make --optimize --output=dist/main.js
```

2. Minify to `dist/main.min.js`:

```bash
elm-minify dist/main.js
```
 
- `elm-minify` can be plugged into [Webpack](https://webpack.js.org/) using [this Node.js API](https://github.com/opvasger/elm-minify#nodejs-api)

- More optimizations for Elm can be found in [the official guide](https://guide.elm-lang.org/optimization/)

## Configuration
The CLI has a number of flags to modify behavior, described here:

```bash
elm-minify --help
```

If it doesn't fit your needs or something isn't working, let me know with [a fresh issue](https://github.com/opvasger/elm-minify/issues/new)!

## Node.js API
This package exposes a node module from it's root. It gives programmatic access to `elm-minify` for various purposes described here:

### WebpackPlugin
```Class (options : Options) => Webpack Plugin```

Plug `elm-minify` into [Webpack](https://webpack.js.org/) with options similar to the CLI:
```
Options: {
    extraRound: true | false | undefined
}
```
The plugin will, in production mode, detect when Webpack is loading files with `.elm` extensions, and minify their content before bundling. The overhead of using this compared to the CLI is ~600 bytes for my [examples](https://github.com/opvasger/elm-minify/tree/master/examples). The Webpack configuration can be found [here](https://github.com/opvasger/elm-minify/blob/master/examples/withWebpack/webpack.config.js).

### minify
```(elmJs : String) => String```

Minify compiled elm code synchronously

### toUglifyCompressionConfig
```(extraRound: Boolean) => UglifyJs Configuration```

Get the UglifyJs configuration for the compression-pass during minification

### uglifyJsMangleConfig
```UglifyJs Configuration```

Get the UglifyJs configuration for the mangling-pass during minification