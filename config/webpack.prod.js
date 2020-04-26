const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require('html-webpack-plugin');// 引入html模板
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 清空文件加
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 单独打包css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const path = require('path');// 引入node的核心模块
const productConfig = {
    mode: 'production',// 打包模式
    devtool: "cheap-module-source-map", // 配置映射
    output: { // 打包文件存放位置
        filename: '[name]_[hash].js', // 文件名称
        path: path.resolve(__dirname, '../dist/js'),// 打包出文件位置（__dirname当前webpack的路径）
        publicPath: '/js/' // 解决异步加载js路径错误问题
    },
    optimization:{
        usedExports:true,// 配置three shaking（用到的js进行打包）
        splitChunks: {
            chunks: "all", // 代码分割只对异步代码生效（all,对所有代码生效）
            minSize: 30000, // 引入的模块（lodash）如果大于3万字节才做代码分割
            maxSize:50000, // 引入的模块（lodash）大于50kb就尝试对其进行二次分割
            minChunks: 1, // 当引入的模块（lodash）被引用至少一次才进行代码分割
            maxAsyncRequests: 10, // 同时加载的模块最多是5个（打包前面的会分割成js文件，如果分割超过5个后面的代码就不做分割）
            maxInitialRequests: 3,// 入口文件（index.js）做代码分割最多分割成3个js文件，如果超过3个就不做分割
            automaticNameDelimiter: '~',// 文件生成的时候连接符
            name: true,
            cacheGroups: { // 打包同步代码时配置分割到哪里
                vendors: { // 要打包的库文件符合下面要求，就会加到vendots组中（vendors可以改成vendors1，这样组的名字就变了）
                    test: /[\\/]node_modules[\\/]/, // 引入库是不是在这个目录下
                    priority: -10, //优先级，（如果一个模块满足两个组的条件）如果这个组优先级高，打包模块就会被打包到这个组中
                },
                default: {
                    priority: -20,
                    reuseExistingChunk: true, // 如果打包a引用了b。b在之前已经被打包过了，则b不再打包直接用刚才打包的b
                }
            }
        }
    },
    module:{
      rules:[
          {
              test: /\.css/,
              use: [
                  MiniCssExtractPlugin.loader,
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
                  MiniCssExtractPlugin.loader,
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
                      outputPath: '../css/images/',
                      // 超过某个字节会和file-loader相同，存文件
                      limit: 10240
                  }
              }
          },
      ]
    },
    plugins: [ // 插件配置
        new HtmlWebpackPlugin(
            {
                template: 'src/index.html', // 应用的html模板
                filename: '../index.html', // html的输出位置
            }
        ),// 处理html
        new MiniCssExtractPlugin({
            filename: '../css/[name]_[hash].css', // 配置打包的css名称（被页面直接引用）
            chunkFilename: '../css/chuck_[name]_[hash].css',// 配置css引入的其他模块css的名称（间接引用）
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new OptimizeCSSAssetsPlugin({}), // 压缩css代码
        new CleanWebpackPlugin(), // 自动根据配置的输出目录进行清空
    ]
}

// module.exports = merge(commonConfig,productConfig);
module.exports = env => {
    if(Object.is(env.NODE_ENV,"development")){ // 本地打包
        productConfig.devtool = "cheap-module-source-map";
        commonConfig.entry =  // 配置文件入口
            {
                main: './src/index.js',
            }
    }else if(Object.is(env.NODE_ENV,"production")){//生产环境
        productConfig.devtool = "";
        commonConfig.entry =  // 配置文件入口
            {
                main: './src/indexService.js',
            }
    }
    return (
        merge(commonConfig,productConfig)
    )
}