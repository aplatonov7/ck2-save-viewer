const isDev = process.env.NODE_ENV === 'development'

const getTimestamp = () => {
  const date = new Date()
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const logger = (...args) => {
  if (!isDev) return
  console.log(getTimestamp(), ...args)
}

export { logger, isDev }
