/**
 * 为了让CSS3样式兼容，需要将某些样式加上浏览器前缀：
 * -ms- 兼容IE浏览器
 * -moz- 兼容firefox
 * -o- 兼容opera
 * -webkit- 兼容chrome 和 safari
 * 这些加前缀的工作可以交给插件来完成，比如安装： autoprefixer需要联合POSTcss-loader使用
 */
module.exports = {
    plugins:[require('autoprefixer')]
}