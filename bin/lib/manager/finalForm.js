const { getPathToFile, removeReadmeSection } = require('../files')
const rimraf = require('rimraf').sync

module.exports = async () => {
  rimraf(getPathToFile('src', 'form', 'final-form'))
  await removeReadmeSection('Final Form', 3)

  return ['react-final-form', 'final-form']
}
