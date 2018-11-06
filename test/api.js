var is = require("assert")
var ter = require("terser")
var wp = require("webpack")

var api = require("../src/api.js")

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

        it("should have tests", function () {

            is.strictEqual(true, false, "no tests yet...")
        })
    })

})