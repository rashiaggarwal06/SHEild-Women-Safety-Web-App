import webpack from 'webpack';

module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      fs: false, // fs is not usable in the browser
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
