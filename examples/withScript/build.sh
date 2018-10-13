#!/bin/sh

elm make src/Main.elm --optimize --output=dist/index.js

# elm-minify dist/index.js
../../src/cli.js dist/index.js