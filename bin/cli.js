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
        "   elm-minify <input>              Minify compiled Elm modules!",
        "",
        "<input>:                           Defaults to 'dist/index.js'",
        "",
        "   --version                       Show package version",
        "   --help                          Show this help message",
        "   [<filepath>.js] [<config>...]   Minify to <filepath>.min.js",
        "",
        "<config>:",
        "",
        "   --overwrite                     Minify to <filepath>.js",
        "   --silent                        Disable console output",
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

        var src = srcPathSize[0],
            path = srcPathSize[1],
            size = srcPathSize[2],
            space = " │ ",
            endSpace = " │"

        return "│ "
            + padText(src, 6, true) + space
            + padText(path, 18, false) + space
            + padText(size / 1000 + "", 10, true) + endSpace
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