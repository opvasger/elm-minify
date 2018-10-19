var ujs = require("uglify-js")
var src = require("webpack-sources")

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

    return {
        extraRound: obj && obj.extraRound === true
    }
}

var endsWith = function (search, text) {
    return text.substring(text.length - search.length) === search
}

var WebpackPlugin = function (obj) {

    var tapConfig = { name: "elm-minify" }

    var config = toWebpackPluginConfig(obj)

    this.apply = function (compiler) {

        if (compiler.options.mode !== "production") return;

        compiler.hooks.compilation.tap(tapConfig, function (compilation) {

            compilation.hooks.optimizeDependencies.tap(tapConfig, function (modules) {

                modules.forEach(function (module) {

                    if (endsWith(".elm", module.resource) === false) return;

                    module._source = new src.RawSource(minify(module._source.source(), 2))
                })
            })
        })
    }
}

module.exports = {
    toUglifyJsCompressionConfig: toUglifyJsCompressionConfig,
    uglifyJsMangleConfig: uglifyJsMangleConfig,
    WebpackPlugin: WebpackPlugin,
    minify: minify
}