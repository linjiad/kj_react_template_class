const webpack = require('webpack');
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const path = require('path');// 引入node的核心模块
const HtmlWebpackPlugin = require('html-webpack-plugin');// 引入html模板
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 清空文件加
const devConfig = {
    mode: "development", // 开发模式
    devtool: "source-map", // 开启调试
    devServer:{// 配置webpack服务
        overlay: true, // 开启页面提示
        contentBase:"./dist",// 启动的文件夹
        historyApiFallback: true,// 单页面路由
        open:true,// 自动打开浏览器
        // host:"0.0.0.0", // 局域网可以访问
        port: 8085,// 开启启动的端口号
        /*proxy: {
            "/api": "http://localhost:3000"
        },*/
        hot:true,// 开启模块热更新功能
        hotOnly:true,// 浏览器不自动刷新
    },
    module:{
        rules:[
            {
                test: /\.css/,
                use: [
                    "style-loader",
                    {
                        loader:"css-loader",
                        options:{
                            importLoaders:2,// 如果是样式引用的样式也执行下面两个插件
                        },
                    },
                ]
            },
            {
                test: /\.less/,
                use: [
                    "style-loader",
                    {
                        loader:"css-loader",
                        options:{
                            importLoaders:2,// 如果是样式引用的样式也执行下面两个插件
                            modules: true,// 开启css模块化打包
                        },
                    },
                    'less-loader',
                    'postcss-loader',
                ]
            },
            {
                // 规则以什么结尾
                test: /\.(jpg|png|gif)$/,
                use: {
                    // 加载哪个模块
                    loader: 'url-loader',
                    // 模块的配置
                    options: {
                        // 打包文件的名称（占位符）
                        name: '[name]_[hash].[ext]',
                        // 打包的路径
                        outputPath: 'images/',
                        // 超过某个字节会和file-loader相同，存文件
                        limit: 10240
                    }
                }
            },
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization:{
        usedExports:true,// 配置three shaking（用到的js进行打包）
    },
    output: { // 打包文件存放位置
        filename: '[name]_[hash].js', // 文件名称
        path: path.resolve(__dirname, '../dist')// 打包出文件位置（__dirname当前webpack的路径）
    },
    plugins: [ // 插件配置
        new HtmlWebpackPlugin(
            {
                template: 'src/index.html', // 应用的html模板
                filename: 'index.html', // html的输出位置
            }
        ),// 处理html
        new CleanWebpackPlugin(), // 自动根据配置的输出目录进行清空
    ]
}
module.exports = merge(commonConfig,devConfig);