#!/usr/bin/env node

var fs = require("fs")
var zlib = require("zlib")

var pkg = require("../package.json")
var api = require("../src/api.js")
var cli = require("../src/cli.js")

var config = cli.argvToConfig(process.argv)

switch (config.msg) {

    case cli.Msg.PrintHelp:
        return console.log(cli.toHelpString(pkg.version))

    case cli.Msg.PrintVersion:
        return console.log(pkg.version)

    case cli.Msg.MinifyFile:

        var inputFileSize = fs.lstatSync(config.inputFilePath).size

        var elmJs = fs.readFileSync(config.inputFilePath, cli.fileReadWriteConfig)

        var minElmJs = api.minify(elmJs, config.extraRound ? 3 : 2)

        var outputFilePath = config.replace
            ? config.inputFilePath
            : config.inputFilePath.replace(".js", "") + ".min.js"

        fs.writeFileSync(outputFilePath, minElmJs, cli.fileReadWriteConfig)

        return console.log(cli.toResultString([
            ["input", config.inputFilePath, cli.toString(cli.toKb(inputFileSize))],
            ["output", outputFilePath, cli.toString(cli.toKb(fs.lstatSync(outputFilePath).size))],
            ["gzip", "", cli.toString(cli.toKb(zlib.gzipSync(minElmJs).byteLength))]
        ]))

    default:
        throw Error("Invalid configuration message", config)
}
