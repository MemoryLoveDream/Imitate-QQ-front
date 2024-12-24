export default {
  ifEmpty: (str, value) => {
    if (str === undefined || str === null || str === '') return value
    else return str
  },
  ifExists: (str, value) => {
    if (str !== undefined && str !== null) return `${str}${value}`
    else return ''
  },
  joinIfExists: (str1, str2) => {
    if (str2 !== '') return `${str2}（${str1}）`
    else return str1
  },
  isPhoneNumber: (str) => {
    return /^1[3-9]\d{9}$/.test(str)
  },
  isEmail: (str) => {
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)
  }
}
