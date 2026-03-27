console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys.prod')
} else {
  module.exports = require('./keys.dev')
}
