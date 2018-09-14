#!/usr/bin/env node
var fs = require("fs")
var zlib = require("zlib")
var ujs = require("uglify-js")
var _ = require("konsole.table")

var pkg = require("../package.json")

var inputArg = process.argv[2]

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
        "Inputs:",
        "",
        "   <filepath>.js       Minify to <filepath>.min.js",
        "   --version           Show package version",
        "   --help              Show this help message",
        "",
        "   If no <input> is specified, 'dist/index.js' is used",
        ""
    ].join("\n"))

    default:
}

var inputPath = inputArg || "dist/index.js"

var outputPath = inputPath.replace(".js", ".min.js")

var inputCode = fs.readFileSync(inputPath, { encoding: "utf8" })

var compressionResult = ujs.minify(inputCode, {
    mangle: false,
    compress: {
        pure_funcs: ["F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
        pure_getters: true,
        keep_fargs: false,
        unsafe_comps: true,
        unsafe: true,
        passes: 2
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

fs.writeFileSync(outputPath, outputResult.code, { encoding: "utf8" })

var inputCodeSize = fs.lstatSync(inputPath).size / 1000
var outputSize = fs.lstatSync(outputPath).size / 1000
var outputGzipSize = zlib.gzipSync(outputResult.code).byteLength / 1000

var pathHeader = "(relative path)"
var sizeHeader = "(kilobyte size)"

console.table({
    "input": {
        [pathHeader]: inputPath,
        [sizeHeader]: inputCodeSize
    },
    "output": {
        [pathHeader]: outputPath,
        [sizeHeader]: outputSize
    },
    "gzip": {
        [sizeHeader]: outputGzipSize
    }
}, [
        pathHeader,
        sizeHeader
    ]
)