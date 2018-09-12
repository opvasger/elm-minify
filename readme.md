# Elm Minify 
Minify compiled Elm modules!

![Elm-Minify v?](https://img.shields.io/npm/v/elm-minify.svg)

![](/example.gif)

## How Do I Use It?
The cli is distributed through NPM:

    npm i -g elm-minify

Compile your Elm module, for example like this:

    elm make --optimize --output=dist/main.js

**Remember the `--optimize` flag**. Minify to `dist/main.min.js` like this:

    elm-minify dist/main.js

If no file is specified for `elm-minify`, it will try to minify `dist/index.js`.

If you're still not sure, take a look at [this example](/example) .

## Can I Use it?
This project should be compatible with the latest versions of mentioned projects:

![Node.js v?](https://img.shields.io/badge/Node.js-dunno-blue.svg)

Additionally, to run the example:

![Elm v0.19](https://img.shields.io/badge/Elm-0.19-blue.svg)