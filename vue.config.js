module.exports = {
    lintOnSave:false,//关闭语法检查
    productionSourceMap:false,
    devServer:{
        proxy:{
            'api':{
                target:"http://8.130.99.124:8889",
                pathRewrite:{'^/api':''}
            }
        }
    }
}