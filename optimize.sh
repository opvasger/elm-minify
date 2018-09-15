#!/bin/sh

#
#   This is the "optimize.sh"-script elm-minify is built around.
#   It was originally posted on https://guide.elm-lang.org/optimization/asset_size.html
#   as part of the official Elm guide.
#

set -e

js="elm.js"
min="elm.min.js"

elm make --optimize --output=$js $@

uglifyjs $js --compress 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9",pure_getters,keep_fargs=false,unsafe_comps,unsafe' | uglifyjs --mangle --output=$min

echo "Compiled size:$(cat $js | wc -c) bytes  ($js)"
echo "Minified size:$(cat $min | wc -c) bytes  ($min)"
echo "Gzipped size: $(cat $min | gzip -c | wc -c) bytes"