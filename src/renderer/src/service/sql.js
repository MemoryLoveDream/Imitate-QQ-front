const listFriendMessagesSQL =
  'SELECT senderId, sendTime, chatType, content FROM message WHERE messageType = 1 ' +
  'AND ((senderId = ? AND receiverId = ?)' +
  'OR (senderId = ? AND receiverId = ?))' +
  'ORDER BY sendTime;'

export default {
  listFriendMessages: (param) => window.api.databaseAll(listFriendMessagesSQL, param)
}
