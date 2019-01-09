var fs = require("fs")
var buff = require("buffer").Buffer
var perf = require("perf_hooks").performance

var api = require("../src/api.js")

var compiledElmPath = "examples/withSpaExample/elm.js"

var compiledElm = fs.readFileSync(compiledElmPath, { encoding: "utf8" })
var compiledElmSize = buff.byteLength(compiledElm, "utf8")

var start = perf.now()
var minifiedElm = api.minify(compiledElm)
var duration = perf.now() - start

var minifiedElmSize = buff.byteLength(minifiedElm, "utf8")
var sizeDifference = compiledElmSize - minifiedElmSize

console.log([
    "",
    "   Performance (based on '" + compiledElmPath + "'):",
    "",
    "       size difference  ~" + (sizeDifference / 1000) + "kb",
    "                        ~" + Math.round(compiledElmSize / minifiedElmSize * 10) / 10 + "x",
    "",
    "       minified size    ~" + minifiedElmSize / 1000 + "kb",
    "",
    "       compiled size    ~" + compiledElmSize / 1000 + "kb",
    "",
    "       time to minify   ~" + Math.round(duration) + "ms",
    ""
].join("\n"))