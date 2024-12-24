import { ElMessage } from 'element-plus'

export default {
  warningMessage: (message) => {
    ElMessage({ type: 'warning', message: message })
  },
  errorMessage: (message) => {
    ElMessage({ type: 'error', message: message })
  }
}
