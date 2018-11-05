#!/usr/bin/env node

var fs = require("fs")
var zlib = require("zlib")

var pkg = require("../package.json")
var api = require("../src/api.js")

var inputArg = process.argv[2] || ""

switch (inputArg) {

    case "--version":
        return console.log(pkg.version)

    case "--help":
        return console.log(toHelp(pkg.version))

    default:

        var inputFilePath = inputArg.indexOf(".js") !== -1
            ? inputArg
            : "dist/index.js"

        var inputFileSize = fs.lstatSync(inputFilePath).size
        var elmJs = fs.readFileSync(inputFilePath, { encoding: "utf8" })
        var minElmJs = api.minify(elmJs)

        var outputFilePath = process.argv.indexOf("--overwrite") !== -1
            ? inputFilePath
            : inputFilePath.replace(".js", "") + ".min.js"

        fs.writeFileSync(outputFilePath, minElmJs, { encoding: "utf8" })

        var outputFileSize = fs.lstatSync(outputFilePath).size
        var outputFileGzipSize = zlib.gzipSync(minElmJs).byteLength

        return process.argv.indexOf("--silent") !== -1 || console.log(toResult([
            ["input", inputFilePath, inputFileSize],
            ["output", outputFilePath, outputFileSize],
            ["gzip", "", outputFileGzipSize]
        ]))
}

function toHelp(version) {

    return [
        "",
        "   elm-minify " + version,
        "",
        "Usage:",
        "",
        "   elm-minify <input>",
        "",
        "<input>:                   'dist/index.js' by default",
        "",
        "   --version               Show package version",
        "   --help                  Show this help message",
        "   <filepath>.js           Minify to <filepath>.min.js",
        "",
        "       [--overwrite]           Minify to <filepath>.js",
        "       [--silent]              Disable console output",
        ""
    ].join("\n")
}

function toResult(srcPathSizes) {

    function padText(text, length, toRight) {

        var lengthDiff = length - text.length

        if (lengthDiff > 0) {

            return toRight
                ? " ".repeat(lengthDiff).concat(text)
                : text.concat(" ".repeat(lengthDiff))
        }
        else if (lengthDiff < 0) {

            return text.slice(0, length)
        }
        else {

            return text
        }
    }

    function toResultEntry(srcPathSize) {

        return "│ "
            + padText(srcPathSize[0], 6, true) + " │ "
            + padText(srcPathSize[1], 18, false) + " │ "
            + padText(srcPathSize[2] / 1000 + "", 10, true) + " │"
    }

    return [
        "┌────────┬────────────────────┬────────────┐",
        "│ source │ rel path           │    kb size │",
        "├────────┼────────────────────┼────────────┤",
    ]
        .concat(srcPathSizes.map(toResultEntry))
        .concat([
            "└────────┴────────────────────┴────────────┘"
        ])
        .join("\n")
}