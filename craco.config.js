// 顶部引入path
const path = require("path");
 
 
module.exports = {
 
  webpack: {
    configure: (webpackConfig) => {
      // 设置publicPath
      webpackConfig.output.publicPath = webpackConfig.mode === "production" ? './' : '';
      return webpackConfig
    }
  }
 

 
}