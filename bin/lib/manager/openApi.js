const {
  getPathToFile,
  replaceLineWithPattern,
  removeReadmeSection,
} = require('../files')
const rimraf = require('rimraf').sync

module.exports = async () => {
  rimraf(getPathToFile('bin', 'install_api.sh'))
  rimraf(getPathToFile('src', 'api', 'configureApi.ts'))
  rimraf(getPathToFile('src', 'api', 'generated'))
  await replaceLineWithPattern(
    getPathToFile('src', 'react-app-env.d.ts'),
    'declare type GlobalFetch = WindowOrWorkerGlobalScope'
  )
  await removeReadmeSection('Open API', 2)
}
