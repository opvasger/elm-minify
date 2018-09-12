#!/bin/sh

elm make src/Main.elm --optimize --output=dist/index.js

../src/cli.js dist/index.js