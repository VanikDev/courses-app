module.exports = {
  increment: (index) => index + 1,
  gt: (a, b) => a > b,
  ifeq: (a, b, options) => {
    if (a == b) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
}
