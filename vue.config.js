'use strict'

module.exports = {
    // 部署应用包时配置的
    publicPath: '/',
    // 打包后的目录
    outputDir: 'dist',
    // 放置生成的静态资源
    assetsDir: '',
    // 指定生成的 index.html 的输出路径
    // indexPath:'/',
    // css
    lintOnSave: false,
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    devServer: {
        // open: process.platform === 'darwin',
        host: '0.0.0.0',
        // port: 8080,
        https: false,
        // hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://43.247.184.50:8280/wallet-admin/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }

            }
        }
    },
}
