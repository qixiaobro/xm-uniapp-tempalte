
import {
    getStorageSync
} from '@/utils/local.js'
import {BASE_URL} from '@/config/index.js'
module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/
        config.baseURL = BASE_URL; /* 根域名 */
        return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	    config.data = config.data || {}
		const token  = getStorageSync('token')
		if(token) {
			config.header['Authori-zation'] = `Bearer ${token}`
		}
	    return config 
	}, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		if (data.status !== 200) { 
			uni.showToast({
				title:data.msg,
				icon:'none',
				duration:3000
			})
			return Promise.reject(data)
		}
		return Promise.resolve(data)
	}, (response) => { 
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}