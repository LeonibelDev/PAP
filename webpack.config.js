const {VueLoaderPlugin} = require("vue-loader")

module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname + "/public/js",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },

            {
                test: /\.css/,
                use: ['vue-style-loader', 'css-loader']
            }
                    
        ]
    },

    plugins: [
        new VueLoaderPlugin()
    ]
}