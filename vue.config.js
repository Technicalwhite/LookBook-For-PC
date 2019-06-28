module.exports={
    devServer:{
        //host:"0.0.0.0",  //ip
        port:2333,             //端口
        proxy:{
            "/api": {
                target: "https://api.zhuishushenqi.com",
                pathRewrite: {
                    "^/api": ""
                },
                changeOrigin: true
            },
            "/mulus": {
                target: "http://api.zhuishushenqi.com",
                pathRewrite: {
                    "^/mulus": ""
                    // http://api.zhuishushenqi.com/atoc/57e3af17a600bfe75150352b?view=chapters
                },
                changeOrigin: true
            },
            '/content':{
                target:'http://chapterup.zhuishushenqi.com',
                changeOrigin:true,
                pathRewrite:{
                  '^/content':'http://chapterup.zhuishushenqi.com'
                }
            },
            '/picture':{
                target:'http://www.zhuishushenqi.com',
                changeOrigin:true,
                pathRewrite:{
                  '^/picture':'http://www.zhuishushenqi.com'
                }
            }
        }
    },
    lintOnSave:false //取消eslint验证
}