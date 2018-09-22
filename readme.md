# Elm Minify 
![](/example.gif)

Minify compiled Elm modules!

[![Elm-Minify v?](https://img.shields.io/npm/v/elm-minify.svg)](https://www.npmjs.com/package/elm-minify)

## How To Use It
The CLI is distributed through [NPM](https://www.npmjs.com/package/elm-minify):

```bash
npm i -g elm-minify
```

For example:

1. Compile your Elm module:

```bash
# remember the "--optimize" flag
elm make --optimize --output=dist/main.js
```

2. Minify to `dist/main.min.js`:

```bash
# it will try to use "dist/index.js" if no path is specified
elm-minify dist/main.js
```

More optimizations for Elm are described in [the official guide](https://guide.elm-lang.org/optimization/)

## If It Isn't Working
The CLI has a number of flags to modify behavior, describe here:

```bash
elm-minify --help
```

If it doesn't fit your needs or something isn't working, let me know with [a fresh issue](https://github.com/opvasger/elm-minify/issues/new)!

The CLI should be compatible with recent versions of mentioned projects:

![Node.js v?](https://img.shields.io/badge/Node.js-dunno-blue.svg)

Additionally, to run the example:

![Elm v0.19](https://img.shields.io/badge/Elm-0.19-blue.svg)