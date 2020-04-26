const path = require('path');// 引入node的核心模块
module.exports = {
    entry:  // 配置文件入口
        {
            main: './src/index.js',
        },
    resolve: {
        extensions: [".js"],
        // mainFieles:["index","child"],// 默认寻找文件夹下的文件
        alias: {  // 别名
            ajax:path.resolve(__dirname,"../my_node/ajax"),
            db:path.resolve(__dirname,"../my_node/db"),
            common:path.resolve(__dirname,"../my_node/common")
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/,/my_node/], // 不解决库中的js
                use: ['babel-loader', 'eslint-loader']
            }
            ,
            {
                test: /\.(eot|ttf|svg|woff|woff2)$/,
                use: {
                    loader: 'file-loader'
                }
            },
        ]
    }
}