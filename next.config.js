const withTM = require('next-transpile-modules')(['@matthill8286/atomic-ui'])

module.exports = withTM({
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.worker\.js$/,
        loader: 'worker-loader',
        options: {
          name: 'static/[hash].worker.js',
          publicPath: '/_next/',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      }
    )
    return config
  },
})
