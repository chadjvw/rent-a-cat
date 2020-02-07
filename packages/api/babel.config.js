module.exports = function(api) {
  api.cache(true)

  const plugins = []

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12.13'
        },
        modules: false,
        debug: true
      }
    ],
    '@babel/preset-typescript'
  ]

  return {
    presets,
    plugins
  }
}
