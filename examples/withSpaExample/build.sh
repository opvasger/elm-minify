#!/bin/sh

elm make src/Main.elm --optimize --output=elm.js

../../bin/cli.js elm.js