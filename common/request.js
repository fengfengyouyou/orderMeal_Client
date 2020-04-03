import urlConfig from './config.js'
import store from '../store/index.js'

let request
const headers = {}
const PORT1 = ''
    
request = (url, method, data, power) => {
/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
    1 == 不通过access_token校验的接口
    2 == 文件下载接口列表
    3 == 验证码登录 */
        
    switch (power){
        case 1:
            headers['Authorization'] = ''
            break;
        default:
            headers['Authorization'] = store.state.token
            break;
    }
    return new Promise(function(resolve,reject){
		uni.request({
		        url: urlConfig + PORT1 + url,
		        method,
		        data: data,
		        dataType: 'json',
		        header: headers
		    }).then(response => {
				let res = response[1]
		        if (!res.data.err && res.statusCode == 200) {
		            resolve(res)
		        } else {
					if(res.data.err==99){
						uni.removeStorageSync('token')
						store.commit('SET_VALUE',{key:'token',value:''})
					}
		            throw res
		        }
		    }).catch(parmas => {
				console.log('报错了')
				reject(parmas)
		　　})
	})    
    
 } 

export default request