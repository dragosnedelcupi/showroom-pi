const { getPathToFile, replaceLineWithPattern } = require('../files')
const rimraf = require('rimraf').sync

module.exports = async () => {
  rimraf(getPathToFile('src', 'assets', 'styles'))
  await replaceLineWithPattern(getPathToFile('src', 'index.tsx'), 'style.scss')

  return ['node-sass']
}
