#!/usr/bin/env node

var fs = require("fs")
var zlib = require("zlib")

var pkg = require("../package.json")
var api = require("../src/api.js")

var Msg = {
    PrintHelp: 0,
    PrintVersion: 1,
    MinifyFile: 2
}

var defaultConfig = {
    msg: Msg.MinifyFile,
    inputFilePath: "dist/index.js",
    extraRound: false,
    replace: false
}

var fileReadWriteConfig = { encoding: "utf8" }

var toKb = function (byteLength) {

    return byteLength / 1000
}

var toString = function (a) {
    return a + ""
}

var argvToConfig = function (argv) {

    var cmdOrFilePath = argv[2]

    switch (cmdOrFilePath) {

        case "--help":
            return { msg: Msg.PrintHelp }

        case "--version":
            return { msg: Msg.PrintVersion }

        default:

            var config = defaultConfig

            config.inputFilePath = cmdOrFilePath
            config.extraRound = argv.indexOf("--extraRound") !== -1
            config.replace = argv.indexOf("--replace") !== -1

            return config
    }

}

var padString = function (text, length, toRight) {

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

var toResultString = function (srcPathSizeArray) {

    var toResultEntry = function (srcPathSize) {

        return "│ "
            + padString(srcPathSize[0], 6, true) + " │ "
            + padString(srcPathSize[1], 18, false) + " │ "
            + padString(srcPathSize[2], 10, true) + " │"
    }

    return [
        "┌────────┬────────────────────┬────────────┐",
        "│ source │ rel path           │    kb size │",
        "├────────┼────────────────────┼────────────┤",
    ]
        .concat(srcPathSizeArray.map(toResultEntry))
        .concat([
            "└────────┴────────────────────┴────────────┘"
        ])
        .join("\n")
}

var helpString = [
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
].join("\n")

var config = argvToConfig(process.argv)

switch (config.msg) {

    case Msg.PrintHelp:
        return console.log(helpString)

    case Msg.PrintVersion:
        return console.log(pkg.version)

    case Msg.MinifyFile:

        var inputFileSize = fs.lstatSync(config.inputFilePath).size

        var elmJs = fs.readFileSync(config.inputFilePath, fileReadWriteConfig)

        var minElmJs = api.minify(elmJs, config.extraRound ? 3 : 2)

        var outputFilePath = config.replace
            ? config.inputFilePath
            : config.inputFilePath.replace(".js", "") + ".min.js"

        fs.writeFileSync(outputFilePath, minElmJs, fileReadWriteConfig)

        return console.log(toResultString([
            ["input", config.inputFilePath, toString(toKb(inputFileSize))],
            ["output", outputFilePath, toString(toKb(fs.lstatSync(outputFilePath).size))],
            ["gzip", "", toString(toKb(zlib.gzipSync(minElmJs).byteLength))]
        ]))

    default:
        throw Error("Invalid configuration message", config)
}
