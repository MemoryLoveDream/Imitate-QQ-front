import request from '../utils/request'

export default {
  verify: (date) => request.post('/user/verify', date),
  register: (data) => request.post('/user/register', data),
  login: (data) => request.post('/user/login', data),

  getUserInfo: (id) => request.get(`/user/user_info/${id}`),
  getPersonalInfo: (data) => request.post('user/personal_info', data),
  getAvatarPath: (type, id) =>
    `${request.defaults.baseURL}/${type === 1 ? 'user' : 'group'}/avatar/${id}`,

  getGroupInfo: (data) => request.post('group/group_info', data),
  updateGroupNote: (data) => request.post('group_member/update_note', data),
  updateGroupNickname: (data) => request.post('group_member/update_nickname', data),

  listPersonalGroupingTypes: (id) => request.post(`/relationship/grouping/${id}`),
  listPersonalGrouping: (id) => request.get(`/relationship/personal_grouping/${id}`),
  listGroupGrouping: (id) => request.get(`/relationship/group_grouping/${id}`),
  updatePersonalNote: (data) => request.post('/relationship/update_note', data),
  updatePersonalGrouping: (data) => request.post('/relationship/update_grouping', data),

  listLatestMessages: (id) => request.post(`/message/latest_messages/${id}`),
  listNewMessages: (id) => request.post(`/message/new_messages/${id}`),

  //getAvatarPath: (id) => request.post('/assets/avatar_path', data),
  getAvatar: (data) =>
    request({
      url: `${request.defaults.baseURL}/assets/head`,
      method: 'post',
      data: data,
      responseType: 'stream'
    }),
  upload: (event, type, id) => {
    let param = new FormData()
    param.append('file', event.target.files[0])
    param.append('type', type)
    param.append('id', id)
    request.post('/assets/upload', param)
    // window.api
    //   .readFile('E:/project/Vue/easychat-front/assets/users/2274399174@qq.com/message_list.json')
    //   .then((data) => {
    //     console.log(data.buffer)
    //     let file = e.target.files[0]
    //     // let blob = new Blob([data.buffer], { type: 'application/json' }) //{ type: 'text/plain' })
    //     // let file = new File([blob], 'message_list.json')
    //     param.append('file', file)
    //     return request.post('/assets/upload', param) //{headers: { 'Content-Type': 'multipart/form-data' }}
    //   })
  }
}
