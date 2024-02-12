const path = require("path");

module.exports = {
  target: "node",
  entry: "./index.js",
  output: {
    filename: "bundle.cjs",
    path: path.resolve(__dirname, "dist"),
  },
  // Additional configuration goes here
};
