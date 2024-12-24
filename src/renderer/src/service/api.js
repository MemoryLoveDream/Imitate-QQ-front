import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({ baseURL: 'http://localhost:8080' })

request.interceptors.request.use(
  (config) => {
    config.headers[localStorage.getItem('tokenName')] = localStorage.getItem('tokenValue')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    // console.log(response)
    // 如果返回的data里有状态码code并且不是0，说明后端返回了错误信息（token过期等），这时候要给前端提示错误信息
    if ('code' in response.data && response.data.code !== 200) {
      // "xxx已存在" 等各种重复错误，后端有返回提示信息，此处在前端用ElMessage做统一拦截提示
      ElMessage.error(response.data.message)
    }
    return response
  },
  (error) => {
    //console.dir(error)
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

export default {
  verify: (date) => request.post('/user/verify', date),
  register: (data) => request.post('/user/register', data),
  login: (data) => request.post('/user/login', data),
  getUserInfo: (id) => request.get(`/user/info/${id}`),

  getFriendInfo: (data) => request.post('/friend/info', data),
  listFriendGroupingTypes: (id) => request.post(`/friend/grouping_type/${id}`),
  listFriendGroupings: (id) => request.get(`/friend/grouping/${id}`),
  updateFriendNote: (data) => request.post('/friend/update_note', data),
  updateFriendGrouping: (data) => request.post('/friend/update_grouping', data),

  getGroupInfo: (data) => request.post('/group/info', data),
  listGroupGroupings: (id) => request.get(`/group/grouping/${id}`),

  updateGroupNote: (data) => request.post('/group_member/update_note', data),
  updateGroupNickname: (data) => request.post('/group_member/update_nickname', data),

  listNewMessages: (id) => request.post(`/message/new/${id}`),
  sendFriendMessage: (data) => request.post('/message/send_friend', data),

  getAvatarPath: (type, id) =>
    `${request.defaults.baseURL}/${type === 1 ? 'user' : 'group'}/avatar/${id}`,
  // getAvatar: (data) =>
  //   request({
  //     url: `${request.defaults.baseURL}/assets/head`,
  //     method: 'post',
  //     data: data,
  //     responseType: 'stream'
  //   }),
  uploadAvatar: (file, type, id) => {
    let param = new FormData()
    param.append('id', id)
    return request.post('/assets/upload', param)
  },
  getChatFile: (data) =>
    request({
      url: `${request.defaults.baseURL}/assets/get_chat_file`,
      method: 'post',
      data: data,
      responseType: 'stream'
    }),
  uploadChatFile: (file, type, id, name) => {
    let param = new FormData()
    param.append('file', file)
    param.append('type', type)
    param.append('id', id)
    param.append('name', name)
    return request.post('/assets/upload_chat_file', param)
  }
}
