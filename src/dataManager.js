import Worker from './workers/data.worker'

class DataManager {
  constructor() {
    this.worker = new Worker()
  }

  sendMessage = (type, payload) => this.worker.postMessage({ type, payload })

  loadData = (fileText, onProgress) =>
    new Promise(resolve => {
      this.sendMessage('parse', fileText)

      this.worker.onmessage = ({ data }) => {
        if (data.type === 'parse_progress') onProgress(data.payload)
        else if (data.type === 'parse_result') resolve()
      }
    })
}

export default new DataManager()
