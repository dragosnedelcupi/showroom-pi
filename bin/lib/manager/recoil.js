const {
  getPathToFile,
  replaceLineWithPattern,
  removeReadmeSection,
} = require('../files')
const rimraf = require('rimraf').sync

module.exports = async (shouldRemoveBoilerplate) => {
  rimraf(getPathToFile('src', 'recoil'))
  await replaceLineWithPattern(
    getPathToFile('src', 'SetupWrapper.tsx'),
    'RecoilRoot'
  )
  await replaceLineWithPattern(
    getPathToFile('src', 'utils', 'storage.ts'),
    'recoil'
  )
  if (shouldRemoveBoilerplate) {
    rimraf(getPathToFile('src', 'recoil', 'selectors', 'todoSelectors.ts'))
    rimraf(getPathToFile('src', 'recoil', 'atoms', 'todoAtoms.ts'))
    rimraf(getPathToFile('src', 'recoil', 'atoms', 'index.ts'))
    rimraf(getPathToFile('src', 'constants', 'todo.ts'))
  }
  await removeReadmeSection('Recoil', 2)

  return ['recoil']
}
