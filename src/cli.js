#!/usr/bin/env node
var fs = require("fs")
var zlib = require("zlib")
var ujs = require("uglify-js")

var pkg = require("../package.json")
var lib = require("./lib.js")

var inputArg = process.argv[2]
var extraRoundArg = process.argv.indexOf("--extra-round") !== -1
var replaceInputArg = process.argv.indexOf("--replace") !== -1

switch (inputArg) {

    case "--version": return console.log(pkg.version)

    case "--help": return console.log([
        "",
        "   elm-minify " + pkg.version,
        "",
        "Usage:",
        "",
        "   elm-minify <input>",
        "",
        "<input>:                   Defaults to 'dist/index.js'",
        "",
        "   <filepath>.js           Minify to <filepath>.min.js",
        "",
        "       [--extra-round]     Run an additional round of compression",
        "       [--replace]         Overwrite the input file with minified output",
        "",
        "   --version                       Show package version",
        "   --help                          Show this help message",
        ""
    ].join("\n"))

    default:
}

var inputPath = inputArg === undefined || inputArg.startsWith("--") ? "dist/index.js" : inputArg

var outputPath = replaceInputArg ? inputPath : inputPath.replace(".js", ".min.js")

var inputCode = fs.readFileSync(inputPath, { encoding: "utf8" })

var compressionResult = ujs.minify(inputCode, {
    mangle: false,
    compress: {
        pure_funcs: ["F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
        pure_getters: true,
        keep_fargs: false,
        unsafe_comps: true,
        unsafe: true,
        passes: extraRoundArg ? 3 : 2
    }
})

if (compressionResult.error) {

    throw compressionResult.error
}

var outputResult = ujs.minify(compressionResult.code, {
    mangle: true,
    compress: false
})

if (outputResult.error) {

    throw outputResult.error
}

var inputSize = fs.lstatSync(inputPath).size / 1000

fs.writeFileSync(outputPath, outputResult.code, { encoding: "utf8" })

var outputSize = fs.lstatSync(outputPath).size / 1000
var outputGzipSize = zlib.gzipSync(outputResult.code).byteLength / 1000

console.log([
    "┌────────┬─────────────────────┬─────────┐",
    "│ source │ rel path            │ kb size │",
    "├────────┼─────────────────────┼─────────┤",
    "│  input │ " + lib.pad(inputPath, 20) + "│" + lib.pad(inputSize, 8, true) + " │",
    "│ output │ " + lib.pad(outputPath, 20) + "│" + lib.pad(outputSize, 8, true) + " │",
    "│   gzip │                     │" + lib.pad(outputGzipSize, 8, true) + " │",
    "└────────┴─────────────────────┴─────────┘"
].join("\n"))
