var ter = require("terser")
var src = require("webpack-sources")

var terserConfig = {
    ecma: 3,
    compress: {
        pure_funcs: [
            "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9",
            "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"
        ],
        pure_getters: true,
        keep_fargs: false,
        unsafe_comps: true,
        unsafe: true,
        passes: 2
    },
    mangle: true
}

var minify = function (elmJs) {

    var result = ter.minify(elmJs, terserConfig)

    if (result.error) throw result.error;

    return result.code
}

var isCompilingToProduction = function (compiler) {

    return compiler
        && compiler.options
        && compiler.options.mode === "production"
}

var isElmWebpackLoaderWithOptimizeFlag = function (loader) {

    return loader
        && loader.loader
        && loader.loader.indexOf("elm-webpack-loader") !== -1
        && loader.options
        && loader.options.optimize === true
}

var WebpackPlugin = function () {

    var tapConfig = { name: "elm-minify" }

    this.apply = function (compiler) {

        if (isCompilingToProduction(compiler) === false) return;

        compiler.hooks.compilation.tap(tapConfig, function (compilation) {

            compilation.hooks.optimizeDependencies.tap(tapConfig, function (modules) {

                modules.forEach(function (module) {

                    if (module.loaders === undefined || module.loaders.findIndex(isElmWebpackLoaderWithOptimizeFlag) === -1) return;

                    module._source = new src.RawSource(minify(module._source.source()))
                })
            })
        })
    }
}

module.exports = {
    terserConfig: terserConfig,
    WebpackPlugin: WebpackPlugin,
    minify: minify
}