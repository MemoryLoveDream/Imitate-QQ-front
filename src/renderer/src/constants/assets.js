//icon
const tabIcons = [
  {
    name: '消息',
    inactive_url: '/src/assets/pic/tabs/message.svg',
    active_url: '/src/assets/pic/tabs/message_active.svg'
  },
  {
    name: '关系',
    inactive_url: '/src/assets/pic/tabs/relationship.svg',
    active_url: '/src/assets/pic/tabs/relationship_active.svg'
  },
  {
    name: '视频',
    inactive_url: '/src/assets/pic/tabs/video.svg',
    active_url: '/src/assets/pic/tabs/video_active.svg'
  },
  {
    name: '社区',
    inactive_url: '/src/assets/pic/tabs/community.svg',
    active_url: '/src/assets/pic/tabs/community_active.svg'
  },
  {
    name: '探索',
    inactive_url: '/src/assets/pic/tabs/explore.svg',
    active_url: '/src/assets/pic/tabs/explore_active.svg'
  }
]

const messageBarIcons = [
  {
    text: '置顶',
    icon: '/src/assets/pic/message_bar/top_up.svg'
  },
  {
    text: '复制QQ号',
    icon: '/src/assets/pic/message_bar/copy.svg'
  },
  {
    text: '标记未读',
    icon: '/src/assets/pic/message_bar/message.svg'
  },
  {
    text: '打开独立聊天窗口',
    icon: '/src/assets/pic/message_bar/independent_window.svg'
  },
  {
    text: '设置免打扰',
    icon: '/src/assets/pic/message_bar/do_not_disturb.svg'
  },
  {
    text: '从消息列表中移除',
    icon: '/src/assets/pic/message_bar/delete.svg'
  },
  {
    text: '屏蔽此人消息',
    icon: '/src/assets/pic/message_bar/shield.svg'
  }
]

const chatFunctionBarIcons = [
  {
    name: '语音通话',
    inactive_url: '/src/assets/pic/chat_function_bar/voice_call.svg',
    hovering_url: '/src/assets/pic/chat_function_bar/voice_call_hover.svg'
  },
  {
    name: '视频通话',
    inactive_url: '/src/assets/pic/chat_function_bar/video_call.svg',
    hovering_url: '/src/assets/pic/chat_function_bar/video_call_hover.svg'
  },
  {
    name: '更多',
    inactive_url: '/src/assets/pic/chat_function_bar/more.svg',
    hovering_url: '/src/assets/pic/chat_function_bar/more_hover.svg'
  }
]

const chatInputIcons = [
  {
    name: '表情',
    inactive_url: '/src/assets/pic/chat_input/emoji.svg',
    hovering_url: '/src/assets/pic/chat_input/emoji_hover.svg'
  },
  {
    name: '文件',
    inactive_url: '/src/assets/pic/chat_input/folder.svg',
    hovering_url: '/src/assets/pic/chat_input/folder_hover.svg'
  },
  {
    name: '图片',
    inactive_url: '/src/assets/pic/chat_input/picture.svg',
    hovering_url: '/src/assets/pic/chat_input/picture_hover.svg'
  },
  {
    name: '语音',
    inactive_url: '/src/assets/pic/chat_input/voice.svg',
    hovering_url: '/src/assets/pic/chat_input/voice_hover.svg'
  }
]

const thumbsUpIcon = {
  name: '点赞',
  inactive_url: '/src/assets/pic/info/thumbs_up.svg',
  active_url: '/src/assets/pic/info/thumbs_up_active.svg'
}

const Icon = {
  ONLINE: '/src/assets/pic/info/online.svg',
  OFFLINE: '/src/assets/pic/info/offline.svg',
  MALE: '/src/assets/pic/info/male.svg',
  FEMALE: '/src/assets/pic/info/female.svg',
  NOTE: '/src/assets/pic/info/note.svg',
  GROUPING: '/src/assets/pic/info/grouping.svg',
  SIGNATURE: '/src/assets/pic/info/signature.svg',
  PERSON: '/src/assets/pic/info/person.svg',
  INTRODUCTION: '/src/assets/pic/info/introduction.svg',
  ANNOUNCEMENT: '/src/assets/pic/info/announcement.svg',
  PROPORTION: '/src/assets/pic/info/proportion.svg',
}

export { tabIcons, messageBarIcons, chatFunctionBarIcons, chatInputIcons, thumbsUpIcon, Icon }
