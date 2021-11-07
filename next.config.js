const withTM = require('next-transpile-modules')(['@matthill8286/atomic-icon-library'])

module.exports = withTM({
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
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ico)(\?.*)?$/,
        exclude: /node_modules/,
        loader: require.resolve('url-loader')
      }
    )
    return config
  },
})
