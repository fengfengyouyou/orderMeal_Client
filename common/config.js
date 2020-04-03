
let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'https://fengfengyou.cn:80'
}else{
    // 生产环境
    url_config = 'https://fengfengyou.cn:80'
}

export default url_config