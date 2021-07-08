const {
  replaceLineWithPattern,
  removeAllFromRegexToRegex,
  removeReadmeSection,
} = require('../files')
const rimraf = require('rimraf').sync
const { GITLAB_CI } = require('../constants')

module.exports = async () => {
  rimraf('stryker.conf.js')
  await replaceLineWithPattern(GITLAB_CI, '- mutation-test')
  await removeReadmeSection('Mutation testing', 3)
  await removeAllFromRegexToRegex(
    GITLAB_CI,
    'mutations',
    'name: ${CI_COMMIT_REF_NAME}'
  )

  return [
    [
      '@stryker-mutator/core',
      '@stryker-mutator/jest-runner',
      '@stryker-mutator/typescript',
    ],
    ['test:mutation'],
  ]
}
