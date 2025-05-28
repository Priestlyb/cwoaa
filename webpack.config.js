// webpack.config.js
module.exports = {
    // ...
    resolve: {
      fallback: {
        url: require.resolve('url/')
      }
    }
  }
  