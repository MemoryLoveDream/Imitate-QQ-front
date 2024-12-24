export default {
  readJson: (path) => {
    return JSON.parse(window.api.read(path))
  },
  writeJson: (path, data, space = '') => {
    window.api.write(path, JSON.stringify(data, null, space))
  },
  calculateFileSize: (totalSize) => {
    if (totalSize < 1024) return `${totalSize}`
    else if (totalSize < 1024 * 1024) return `${(totalSize / 1024).toFixed(1)}K`
    else if (totalSize < 1024 * 1024 * 1024) return `${(totalSize / (1024 * 1024)).toFixed(1)}M`
    else return `${(totalSize / (1024 * 1024 * 1024)).toFixed(1)}G`
  },
  getFileExtension: (filename) => {
    return filename.split('.').pop()
  },
  selectImage: () => {
    return window.api.selectFile({
      filters: [
        {
          name: 'Images',
          extensions: ['jpg', 'png', 'gif', 'jpeg', 'webp', 'avif', 'bmp', 'sharpp', 'apng']
        }
      ],
      properties: ['openFile']
    })
  }
}
