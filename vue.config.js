const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ],
    resolve:{
      fallback:{
      child_process: false,
      fs: false,
    }
  }
  },
  // Other Vue CLI options...
});
