const {
  getPathToFile,
  replaceLineWithPattern,
  removeAllFromRegexToRegex,
  removeReadmeSection,
} = require('../files')
const rimraf = require('rimraf').sync

module.exports = async (shouldRemoveBoilerplate, shouldremoveCypress) => {
  if (shouldremoveCypress) {
    await replaceLineWithPattern(
      getPathToFile('src', 'SetupWrapper.tsx'),
      '\n.*\n.*\n$'
    )
  }
  await removeReadmeSection('Redux configuration', 2)
  rimraf(getPathToFile('src', '__tests__', 'store'))
  rimraf(getPathToFile('src', '__mocks__', 'Counter.ts'))
  rimraf(getPathToFile('src', '__mocks__', 'storeMock.ts'))
  rimraf(getPathToFile('src', '__tests__', 'components', 'counter'))
  rimraf(getPathToFile('src', 'store'))
  await removeAllFromRegexToRegex(
    getPathToFile('src', '__mocks__', 'wrappers.tsx'),
    'interface StoreProviderWrapper',
    null,
    6
  )
  await replaceLineWithPattern(
    getPathToFile('src', '__mocks__', 'wrappers.tsx'),
    'mockedStore'
  )
  await replaceLineWithPattern(
    getPathToFile('src', '__mocks__', 'wrappers.tsx'),
    'redux'
  )
  await replaceLineWithPattern(
    getPathToFile('src', '__mocks__', 'wrappers.tsx'),
    '\n.*'.repeat(26) + '$'
  )
  await replaceLineWithPattern(
    getPathToFile('src', 'SetupWrapper.tsx'),
    './store'
  )
  await replaceLineWithPattern(
    getPathToFile('src', 'SetupWrapper.tsx'),
    'redux'
  )
  await replaceLineWithPattern(
    getPathToFile('src', 'SetupWrapper.tsx'),
    'store={'
  )
  await replaceLineWithPattern(
    getPathToFile('src', 'SetupWrapper.tsx'),
    '</Provider>'
  )

  if (shouldRemoveBoilerplate) {
    await replaceLineWithPattern(
      getPathToFile('src', 'pages', 'Home.tsx'),
      'Counter'
    )
    rimraf(getPathToFile('src', 'components', 'counter'))
  }

  if (shouldremoveCypress && shouldRemoveBoilerplate) {
    await removeAllFromRegexToRegex(
      getPathToFile('cypress', 'integration', 'pages', 'Home.spec.ts'),
      "it('s",
      null,
      13
    )
    await replaceLineWithPattern(
      getPathToFile('cypress', 'support', 'commands.js'),
      'counterReducer'
    )
    await removeAllFromRegexToRegex(
      getPathToFile('cypress', 'support', 'commands.js'),
      'incrementCounterReducer',
      null,
      7
    )
    await removeAllFromRegexToRegex(
      getPathToFile('cypress', 'support', 'index.d.ts'),
      '/**',
      null,
      7
    )
  }

  return [
    '@reduxjs/toolkit',
    'react-redux',
    'redux',
    'redux-devtools-extension',
    'redux-mock-store',
  ]
}
