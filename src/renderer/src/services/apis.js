import request from '../utils/request'

export default {
  login: (data) => request.post('/user/login', data),
  register: (data) => request.post('/user/register', data),
  getUserInfo: (id) => request.get(`/user/user_info/${id}`),
  getPersonalInfo: (data) => request.post('user/personal_info', data),
  getGroupInfo: (data) => request.post('group/group_info', data),
  updateGroupNote: (data) => request.post('group_member/update_note', data),
  updateGroupNickname: (data) => request.post('group_member/update_nickname', data),
  getPersonalGroupingTypes: (id) => request.post(`/relationship/grouping/${id}`),
  getPersonalGrouping: (id) => request.get(`/relationship/personal_grouping/${id}`),
  getGroupGrouping: (id) => request.get(`/relationship/group_grouping/${id}`),
  updatePersonalNote: (data) => request.post('/relationship/update_note', data),
  updatePersonalGrouping: (data) => request.post('/relationship/update_grouping', data),
  getLatestMessages: (id) => request.post(`/message/latest_messages/${id}`),
  getNewMessages: (id) => request.post(`/message/new_messages/${id}`),
  getAssets: (name) => `${request.defaults.baseURL}/assets${name}`,
  upload: (e) => {
    let param = new FormData()
    window.api
      .readFile('E:/project/Vue/easychat-front/assets/users/1000000000/message_list.json')
      .then((data) => {
        console.log(data.buffer)
        let file = e.target.files[0]
        // let blob = new Blob([data.buffer], { type: 'application/json' }) //{ type: 'text/plain' })
        // let file = new File([blob], 'message_list.json')
        param.append('file', file)
        return request.post('/assets/upload', param) //{headers: { 'Content-Type': 'multipart/form-data' }}
      })
  }
}
