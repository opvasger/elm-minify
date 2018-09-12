# Elm Minify 
Minify compiled Elm modules!

![Elm-Minify v?](https://img.shields.io/npm/v/elm-minify.svg)

![](/example.gif)

## How Do I Use It?
The CLI is distributed through NPM:

```bash
npm i -g elm-minify
```

Compile your Elm module, for example like this:

```bash
# remember the "--optimize" flag
elm make --optimize --output=dist/main.js
```

Minify to `dist/main.min.js` like this:

```bash
# it will try to use "dist/index.js" if no path is specified
elm-minify dist/main.js
```

Take a look at [this example](/example).

## Can I Use it?
This project should be compatible with the latest versions of mentioned projects:

![Node.js v?](https://img.shields.io/badge/Node.js-dunno-blue.svg)

Additionally, to run the example:

![Elm v0.19](https://img.shields.io/badge/Elm-0.19-blue.svg)