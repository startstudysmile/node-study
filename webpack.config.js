const path = require('path')
const webpack = reqire(webpack)
const ExtarctTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin')


const extractLess = new ExtarctTextPlugin({
  filename: '[name][contenthash].css',
  disable: process.env.NODE_ENV === 'development'
})

module.exports = {
  entry: {
    index: './src/script/index.js',
    print: './src/script/print.js',
    ventor: ['react', 'react-dom ']
  },
  output: {
    path: path.resolve(__dirname, 'build/script'),
    filename: '[name].js '
  },
  module: {
    // rules模块规则（配置loader、解析器等选项）
    rules: [
      {
        test: /\.js$/, // 正则表达式
        include: [path.resolve(__dirname, 'src/script')], // 包含的文件 （地址为绝对路径地址）
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        // loader 是重下至上执行
        use: extractLess.extract({
          use: [
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
                // 每个loader 有对应 的使用方法
                strictMatch: true,
                noIeCompact: true
              }
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    extractLess,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['ventor', 'runtime']
      // minChunks: function (module) {
      //   return module.context && module.context.indexOf()
      // }
    }),
    new UglifyJSPlugin( )
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDom'
  }
}
