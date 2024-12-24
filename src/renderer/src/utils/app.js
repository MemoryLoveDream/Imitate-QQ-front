import {
  MainPageWindowHeight,
  MainPageWindowMinHeight,
  MainPageWindowMinWidth,
  MainPageWindowWidth
} from '../constants/constants'

export default {
  createMainPageWindow: (data, id) => {
    localStorage.setItem('tokenName', data.tokenName)
    localStorage.setItem('tokenValue', data.tokenValue)
    window.api.createWindow('main', MainPageWindowHeight, MainPageWindowWidth, `/main?id=${id}`, {
      transparent: true,
      minWidth: MainPageWindowMinWidth,
      minHeight: MainPageWindowMinHeight
    })
    window.api.close('login')
  }
}
