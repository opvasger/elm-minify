#!/usr/bin/env node

var fs = require("fs")
var ujs = require("uglify-js")

var inputPath = process.argv[2] || "dist/index.js"

var outputPath = inputPath.replace(".js", ".min.js")

var inputStatus = fs.lstatSync(inputPath)

var inputFile = fs.readFileSync(inputPath, { encoding: "utf8" })

outputResult = ujs.minify(inputFile, {
    compress: {
        pure_funcs: ["F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
        pure_getters: true,
        keep_fargs: false,
        unsafe_comps: true,
        unsafe: true,
        passes: 2
    },
    mangle: true
})

if (outputResult.error) {

    throw outputResult.error
}

fs.writeFileSync(outputPath, outputResult.code, { encoding: "utf8" })

var outputStatus = fs.lstatSync(outputPath)

console.table({
    ["INPUT (" + inputPath + ")"]: { ["SIZE (KB)"]: inputStatus.size / 1000 },
    ["OUTPUT (" + outputPath + ")"]: { ["SIZE (KB)"]: outputStatus.size / 1000 }
})