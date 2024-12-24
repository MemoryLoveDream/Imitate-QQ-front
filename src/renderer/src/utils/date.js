import dayjs from 'dayjs'

const Weekdays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

export function now() {
  return dayjs().format()
}

export function messageFormat(sendTime, now = dayjs()) {
  if (sendTime === '') return ''
  let date = dayjs(sendTime)
  let gapDay = now.diff(date, 'day')
  if (gapDay === 0) return date.format('HH:mm')
  else if (gapDay === 1) return '昨天'
  else if (gapDay < 7) return Weekdays[date.day() - 1]
  else return date.format('YYYY/MM/DD')
}

export function tipFormat(sendTime, now = dayjs()) {
  if (sendTime === '') return ''
  let date = dayjs(sendTime)
  let gapDay = now.diff(date, 'day')
  if (gapDay === 0) return date.format('HH:mm')
  else if (gapDay === 1) return '昨天' + date.format('HH:mm')
  else if (gapDay < 7) return Weekdays[date.day() - 1] + ' ' + date.format('HH:mm')
  else return date.format('YYYY/MM/DD HH:mm')
}

export function chatFormat(sendTime, now = dayjs()) {
  if (sendTime === '') return ''
  let date = dayjs(sendTime)
  if (date.year() === now.year()) return date.format('MM-DD HH:mm:ss')
  else return date.format('YYYY-MM-DD HH:mm:ss')
}
