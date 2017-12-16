module.exports = function override(config) {
  const { module: { rules } } = config

  rules[0].use[0].options.useEslintrc = true

  rules.unshift({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' },
  })

  return config
}
