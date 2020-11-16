const path = require("path");

module.exports = {
  entry: [
    "./js/data.js",
    "./js/sort.js",
    "./js/card.js",
    "./js/map.js",
    "./js/move.js",
    "./js/main.js",
    "./js/form.js",
    "./js/debounce.js",
    "./js/image.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
