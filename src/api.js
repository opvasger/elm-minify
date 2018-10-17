var ujs = require("uglify-js")

var toUglifyJsCompressionConfig = function (passes) {

    return {
        mangle: false,
        compress: {
            pure_funcs: [
                "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9",
                "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"
            ],
            pure_getters: true,
            keep_fargs: false,
            unsafe_comps: true,
            unsafe: true,
            passes: passes
        }
    }
}

var uglifyJsMangleConfig = {
    mangle: true,
    compress: false
}

var minify = function (elmJs, compressionPasses) {

    var compressionResult = ujs.minify(elmJs,
        toUglifyJsCompressionConfig(compressionPasses)
    )

    var mangleResult = ujs.minify(compressionResult.code,
        uglifyJsMangleConfig
    )

    return mangleResult.code
}

var toWebpackPluginConfig = function (obj) {

    throw Error("todo")
}

var WebpackPlugin = function (obj) {

    var config = toWebpackPluginConfig(obj)

    throw Error("todo")

    this.prototype.apply = function (compiler) {

        throw Error("todo")
    }
}

module.exports = {
    toUglifyJsCompressionConfig: toUglifyJsCompressionConfig,
    uglifyJsMangleConfig: uglifyJsMangleConfig,
    minify: minify,
    WebpackPlugin: WebpackPlugin
}