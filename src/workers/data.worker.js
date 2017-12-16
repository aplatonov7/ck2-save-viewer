let isDev = true

const getTimestamp = () => {
  const date = new Date()
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const logger = (...args) => {
  if (!isDev) return
  console.log(getTimestamp(), ...args)
}

class Parser {
  constructor(data, period = 100) {
    this.progressPeriod = period
    this.lines = data.split('\n').slice(1)
  }

  next() {
    if (this.ind === this.lines.length) return null
    if (this.onProgress && Date.now() - this.lastProgress > this.progressPeriod) {
      this.onProgress(this.ind / this.lines.length)
      this.lastProgress = Date.now()
    }
    return this.lines[this.ind++].trim()
  }

  parseObject(depth = 0) {
    if (depth !== 0) {
      const line = this.next()
      if (line !== '{') return null
    }

    const ret = {}
    let line = this.next()

    while (line !== null && line !== '}') {
      if (line !== '') {
        const decs = line.split('=')
        if (decs.length > 2) {
          // Only seems to happen when we have nick and hist fields not properly
          // separated by new line
          const [key1, val1, key2, val2] = [decs[0], ...decs[1].split(/\s+/), decs[2]]
          ret[key1] = val1
          ret[key2] = val2
        } else {
          const key = decs[0]
          let val = decs[1]

          if (val === '') {
            val = this.parseObject(depth + 1)
          } else if (val === '{') {
            const arr = []
            let obj = this.parseObject(depth + 1)
            while (obj !== null) {
              arr.push(obj)
              if (this.next() === '}') break
              obj = this.parseObject(depth + 1)
            }
          }

          if (Object.hasOwnProperty.call(ret, key)) {
            if (Array.isArray(ret[key])) {
              ret[key].push(val)
            } else {
              ret[key] = [ret[key], val]
            }
          } else {
            ret[key] = val
          }
        }
      }

      line = this.next()
    }

    return ret
  }

  parse(onProgress) {
    this.ind = 0
    this.lastProgress = Date.now()
    this.onProgress = onProgress
    return this.parseObject()
  }
}

class DataManager {
  constructor(data) {
    this.data = data
  }
}

let dataManager = null // eslint-disable-line no-unused-vars

const handlers = {
  parse: (...args) => {
    const parser = new Parser(...args)

    const onProgress = payload => postMessage({ type: 'parse_progress', payload })

    const data = parser.parse(onProgress)
    dataManager = new DataManager(data)
    return null
  },
}

const handleMessage = ({ type, payload, devMode }) => {
  isDev = devMode

  logger('Started', type)
  const handler = handlers[type]
  if (!handler) return

  postMessage({ type: `${type}_result`, payload: handler(payload) })
  logger('Finished', type)
}

onmessage = ({ data }) => handleMessage(data)
