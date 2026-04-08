type Options = {
  fn: (context: any) => string
  inverse: (context: any) => string
}

type HelperFunction = {
  increment: (index: number) => number
  gt: (a: number, b: number) => boolean
  ifeq: (a: any, b: any, options: Options) => string
}

const helpers: HelperFunction = {
  increment: (index: number): number => index + 1,
  gt: (a: number, b: number): boolean => a > b,
  ifeq: (a: any, b: any, options: Options): string => {
    if (a == b) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
}

export default helpers