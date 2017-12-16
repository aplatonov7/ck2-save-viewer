export default class Worker {
  postMessage(...args) {
    if (typeof this.onmessage === 'function') this.onmessage(...args)
  }
}
