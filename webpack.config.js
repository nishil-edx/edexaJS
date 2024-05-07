const path = require('path')

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Update the file extension to .ts
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // Include .ts file extension
  },
}
