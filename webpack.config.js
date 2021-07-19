var path = require("path");

module.exports = {
  entry: "./client-request-manager.ts",
  mode: "production",
  target: "node",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "client-request-manager.js",
    library: "ClientRequestManager",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".js"], //resolve all the modules other than index.ts
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.ts?$/,
      },
    ],
  },
};
