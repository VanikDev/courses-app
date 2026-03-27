console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

const keysModule =
  process.env.NODE_ENV === 'production' ? await import('./keys.prod.js') : await import('./keys.dev.js')

export default keysModule.default
