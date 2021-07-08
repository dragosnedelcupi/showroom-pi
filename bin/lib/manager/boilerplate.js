const { FINAL_FORM } = require('../constants')
const {
  getPathToFile,
  replaceLineWithPattern,
  replaceRegex,
  removeAllFromRegexToRegex,
} = require('../files')
const rimraf = require('rimraf').sync

async function removeRecoilJsBoilerplate() {
  rimraf(getPathToFile('src', 'recoil', 'selectors', 'todoSelectors.ts'))
  rimraf(getPathToFile('src', 'recoil', 'atoms', 'todoAtoms.ts'))
  rimraf(getPathToFile('src', 'recoil', 'atoms', 'index.ts'))
  await replaceLineWithPattern(
    getPathToFile('src', 'utils', 'storage.ts'),
    'recoil'
  )
  rimraf(getPathToFile('src', 'constants', 'todo.ts'))
  rimraf(getPathToFile('src', 'recoil', 'Recoil.stories.tsx'))
}

async function removeCypressBoilerplate() {
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
  await replaceLineWithPattern(
    getPathToFile('cypress', 'support', 'commands.js'),
    'counterActions'
  )
  await removeAllFromRegexToRegex(
    getPathToFile('cypress', 'integration', 'pages', 'Home.spec.ts'),
    "it('s",
    null,
    13
  )
}

async function removeReduxBoilerplate() {
  rimraf(getPathToFile('src', 'components', 'counter', 'Counter.tsx'))
  await replaceRegex(
    getPathToFile('src', 'store', 'index.ts'),
    'counterReducer,',
    '// TODO add reducer here'
  )
  await replaceLineWithPattern(
    getPathToFile('src', 'store', 'index.ts'),
    'import counterReducer'
  )
  await replaceLineWithPattern(
    getPathToFile('src', 'pages', 'Home.tsx'),
    'Counter'
  )
  rimraf(getPathToFile('src', 'store', 'countSelectors.ts'))
  rimraf(getPathToFile('src', 'store', 'reducers', 'counterReducer.ts'))
  rimraf(getPathToFile('src', 'store', 'selectors', 'countSelectors.ts'))
  rimraf(getPathToFile('src', 'store', 'selectors', 'index.ts'))
  rimraf(getPathToFile('src', '__tests__', 'components', 'counter'))
  rimraf(
    getPathToFile(
      'src',
      '__tests__',
      'store',
      'reducers',
      'counterReducer.test.ts'
    )
  )
}

async function removeBoilerplateRoutes() {
  await replaceLineWithPattern(getPathToFile('src', 'App.tsx'), 'About')
  await replaceLineWithPattern(getPathToFile('src', 'App.tsx'), 'Navbar')
}

function removeBoilerplatePages() {
  rimraf(getPathToFile('src', 'pages', 'About.tsx'))
}

module.exports = async (formOption) => {
  removeBoilerplatePages()
  await removeBoilerplateRoutes()
  await removeReduxBoilerplate()
  await removeCypressBoilerplate()
  await removeRecoilJsBoilerplate()
  rimraf(getPathToFile('src', '__tests__', 'form'))
  if (formOption !== FINAL_FORM) {
    rimraf(getPathToFile('src', 'utils', 'number.ts'))
    rimraf(getPathToFile('src', 'constants', 'form.ts'))
  }

  rimraf(getPathToFile('src', 'components', 'Navbar.tsx'))
}
