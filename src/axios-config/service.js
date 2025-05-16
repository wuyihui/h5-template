import axios from 'axios'
import qs from 'qs'
import config from './config'
import { useCache } from '@/hooks/useCache'
import router, { resetRouter } from '@/router'
import { showToast } from 'vant'

const { wsCache } = useCache()
const { wsCache: localWsCache } = useCache('localStorage')

export const PATH_URL = import.meta.env.VITE_API_BASEURL

// 创建axios实例
const service = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout, // 请求超时时间
  withCredentials: true,
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  },
)

// response 拦截器
service.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      if (response.data.code === config.result_code) {
        resolve(response.data)
      } else if (response.data.code === config.expire_code) {
        showToast(response.data.message)

        // wsCache.delete(store.getters.userInfo)
        Promise.all([
          resetRouter(), // 重置静态路由表
        ]).then(() => {
          router.replace('/login')

          reject(response)
        })
      } else {
        showToast(response.data.message)
        reject(response)
      }
    })
  },
  (error) => {
    console.log(error) // for debug
    showToast(error.message)
    return Promise.reject(error)
  },
)

export default service
