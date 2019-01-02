var fs = require("fs")
var is = require("assert")
var ter = require("terser")
var wp = require("webpack")
var ugl = require("uglify-js")
var buff = require("buffer").Buffer

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

        var minifiedSize = buff.byteLength(minifiedElm, "utf8")

        it("removes some JavaScript", function () {

            is.strictEqual(
                buff.byteLength(compiledElm, "utf8") > minifiedSize,
                true,
                "The 'minify' API doesn't seem to remove any JavaScript"
            )
        })

        it("outputs code functionally equivalent to its input", function () {

            is.strictEqual(typeof compiledApp.Elm.Main.init, "function", "The compiled Elm module is broken")
            is.strictEqual(typeof minifiedApp.Elm.Main.init, "function", "The minified Elm module is broken")
        })

        it("has comparable (or better) performance than using '/original.sh'", function () {

            var uglifyCompressionConfig = {
                compress: {
                    pure_funcs: [
                        "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9",
                        "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"
                    ],
                    pure_getters: true,
                    keep_fargs: false,
                    unsafe_comps: true,
                    unsafe: true
                },
                mangle: false
            }

            var uglifyMangleConfig = {
                mangle: true
            }

            var maxByteDiff = 1000

            var uglifiedElm = ugl.minify(ugl.minify(compiledElm, uglifyCompressionConfig).code, uglifyMangleConfig).code

            var uglifiedSize = buff.byteLength(uglifiedElm, "utf8")

            is.strictEqual(
                minifiedSize <= uglifiedSize + maxByteDiff,
                true,
                "The minification process is " + Math.abs(uglifiedSize - minifiedSize) + " bytes less efficient than '/original.sh'."
            )
        })
    })
})