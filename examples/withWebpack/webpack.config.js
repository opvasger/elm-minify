module.exports = {
    target: "web",
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "index.min.js"
    },
    module: {
        rules: [
            {
                test: /.elm$/,
                use: {
                    loader: "elm-webpack-loader",
                    options: {
                        optimize: true
                    }
                }
            }
        ]
    }
}