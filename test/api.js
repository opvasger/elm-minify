var fs = require("fs")
var is = require("assert")
var ter = require("terser")
var wp = require("webpack")

var api = require("../src/api.js")

var compiledApp = require("../examples/withScript/dist/index.js")
var minifiedApp = require("../examples/withScript/dist/index.min.js")

describe("Node.js API", function () {

    describe("terserConfig", function () {

        it("is a valid configuration for Terser", function () {

            var result = undefined

            try {

                result = ter.minify("var add = function(x, y) { return x + y }", api.terserConfig)
            }
            catch (error) {

                is.fail("Terser threw an expection during minification", error)
            }

            is.strictEqual(result.error, undefined, "The configuration was accapted, but resulted in an error")
        })
    })

    describe("WebpackPlugin", function () {

        it("is a valid configuration for Webpack", function () {

            wp({ plugins: [new api.WebpackPlugin()] }, function (error, stats) {

                is.strictEqual(error, null, "The configuration wasn't accepted by Webpack")
            })
        })
    })

    describe("minify", function () {

        var compiledElmPath = "examples/withScript/dist/index.js"

        var compiledElm = fs.readFileSync(compiledElmPath, { encoding: "utf8" })
        var minifiedElm = api.minify(compiledElm)

        it("should remove some JavaScript", function () {

            is.strictEqual(compiledElm.length > minifiedElm.length, true, "The 'minify' API doesn't seem to remove any JavaScript")
        })

        it("should produce code functionally equivalent to its input", function () {

            is.strictEqual(typeof compiledApp.Elm.Main.init, "function", "The compiled Elm module is broken")
            is.strictEqual(typeof minifiedApp.Elm.Main.init, "function", "The minified Elm module is broken")
        })
    })

})