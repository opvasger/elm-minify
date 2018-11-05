#!/bin/sh

elm make src/Main.elm --optimize --output=dist/index.js

../../bin/cli.js dist/index.js