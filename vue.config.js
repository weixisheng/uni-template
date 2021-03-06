const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    config.resolve.symlinks(true)

    config.resolve.alias
      .set('@', resolve('src'))
      .set('@http', resolve('src/fly-request'))
  }
}
