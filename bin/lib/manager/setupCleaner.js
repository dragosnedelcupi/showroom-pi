const {
  getPathToFile,
  replaceRegex,
  removeEmptyDirectories,
} = require('../files')
const rimraf = require('rimraf').sync
const { README } = require('../constants')

module.exports = async () => {
  rimraf(getPathToFile('bin', 'dependency_trim.js'))
  rimraf(getPathToFile('bin', 'test_dependency_trim.js'))
  rimraf(getPathToFile('bin', 'lib'))
  await replaceRegex(
    getPathToFile(README),
    /\n# IMPORTANT -Initial Project Setup![\s\S]*?(?=\n#[^#]|$)/,
    ''
  )
  await removeEmptyDirectories(getPathToFile('src'))

  return ['chalk', 'clear', 'figlet', 'inquirer', 'rimraf', 'pretty-error']
}
