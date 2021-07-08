const {
  getPathToFile,
  replaceLineWithPattern,
  removeReadmeSection,
} = require('../files')
const rimraf = require('rimraf').sync

module.exports = async (shouldRemoveBoilerplate) => {
  rimraf(getPathToFile('src', 'form', 'react-hook-form'))
  await replaceLineWithPattern('src/setupTests.ts', 'mutationobserver-shim')
  await removeReadmeSection('React Hook Form', 3)

  if (shouldRemoveBoilerplate) {
    rimraf(getPathToFile('src', '__tests__', 'form', 'ReactHookForm.test.tsx'))
  }

  return ['react-hook-form', 'mutationobserver-shim']
}
