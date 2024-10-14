import axios from 'axios'
// import router from '@/router'
import { ElMessage } from 'element-plus'

const baseURL = 'http://localhost:8080'
const instance = axios.create({ baseURL })

instance.interceptors.request.use(
  (config) => {
    // const token = userInfoStore.userInfo ? userInfoStore.userInfo.token : null
    // if (token) {
    //   config.headers.Authorization = token
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  // 响应http状态码为 2xx,3xx 时触发成功的回调，形参中的 response 是“成功的结果”
  (response) => {
    // console.log(response)
    // 如果返回的data里有状态码code并且不是0，说明后端返回了错误信息（token过期等），这时候要给前端提示错误信息
    if ('code' in response.data && response.data.code !== 200) {
      // "xxx已存在" 等各种重复错误，后端有返回提示信息，此处在前端用ElMessage做统一拦截提示
      ElMessage.error(response.data.message)
    }
    // 对响应的response先在上面拦截处理，最后再放行，返回response
    return response
  },
  (error) => {
    // console.dir(error)
    if (error.response.status === 401) {
      // 无效的 token (不存在，过期，伪造或者被修改)
      // token没用了，把 Pinia 中的一切重置为空，并跳转到登录页面(相当于没token的状态)
      // userInfoStore.userInfo = null
      // ElMessage.error('用户身份已过期~')
      // router.push('/login') // js无法获取this.$router，所以要引入router来跳转
    }
    return Promise.reject(error)
  }
)

export default instance
