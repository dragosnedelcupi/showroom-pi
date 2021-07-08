const { GITLAB_CI, PACKAGE_JSON, ESLINT_RC } = require('../constants')
const {
  getPathToFile,
  replaceLineWithPattern,
  replaceRegex,
  removeReadmeSection,
  removeRegexFromScripts,
  removeCypressEslintConfig,
} = require('../files')
const rimraf = require('rimraf').sync

module.exports = async () => {
  rimraf('cypress.json')
  rimraf('cypress')
  rimraf(getPathToFile('docker', 'Dockerfile-cypress'))
  await replaceRegex(PACKAGE_JSON, / \.\/cypress\/integration/)
  await removeReadmeSection('E2E', 3)
  await replaceLineWithPattern(
    getPathToFile('src', 'SetupWrapper.tsx'),
    '\n.*\n.*\n$'
  )
  await replaceLineWithPattern(GITLAB_CI, '- cache/Cypress')
  await replaceLineWithPattern(GITLAB_CI, 'CYPRESS_CACHE_FOLDER')
  await replaceRegex(GITLAB_CI, /\nE2E Tests:[\s\S]*?(?=\n\n)/, '')
  await removeRegexFromScripts(' ./cypress/integration', 'lint', 'lint:fix')
  await removeCypressEslintConfig()
  await replaceRegex(ESLINT_RC, '"./cypress/tsconfig.json",', '')

  return [
    ['cypress', '@testing-library/cypress', 'eslint-plugin-cypress'],
    ['start-ci', 'cy:open', 'test:e2e', 'test:e2e:ci'],
  ]
}
