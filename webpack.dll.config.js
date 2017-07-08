var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        dll: ['google-map-react','react','deck.gl','react-dom']
    },
    output: {
        path:path.join(__dirname,'./dist/js'),
        filename: '[name].bundle.js',/* output.library 将会定义为 window.${output.library} */
        library: '[name]'
    },
    plugins: [
/*        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),*/
        new webpack.DllPlugin({ /*path 定义 manifest文件生成的位置 [name]的部分由entry的名字替换*/
            path: path.join(__dirname, '[name]-manifest.json'),
            name: '[name]'/*name dll bundle输出到那个全局变量上和 output.library 一样即可*/
        })
    ]
};