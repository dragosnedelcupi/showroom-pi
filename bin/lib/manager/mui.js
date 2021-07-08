const { getPathToFile, moveAllFiles, replaceRegex, replaceLineWithPattern } = require('../files')
const rimraf = require('rimraf').sync

module.exports = {
  removeMUI: async (keepStory) => {
    await replaceLineWithPattern(
      getPathToFile('src', 'SetupWrapper.tsx'),
      'MuiThemeProvider'
    )
    rimraf(getPathToFile('src', 'form', 'final-form', 'atoms', 'mui'))
    rimraf(getPathToFile('src', 'form', 'react-hook-form', 'atoms', 'mui'))
    rimraf(getPathToFile('src', 'theme.ts'))
    if (!keepStory) {
      rimraf(
        getPathToFile('src', 'form', 'final-form', 'FinalFormMUI.stories.tsx')
      )
      rimraf(
        getPathToFile(
          'src',
          'form',
          'react-hook-form',
          'ReactHookMUI.stories.tsx'
        )
      )
    }
    await replaceLineWithPattern(
      getPathToFile('src', 'SetupWrapper.tsx'),
      'theme'
    )
    return ["@material-ui/core"] //deps MUI
  },
  replaceDefaultWithMUI: async () => {
    await replaceRegex(
      getPathToFile(
        'src',
        'form',
        'react-hook-form',
        'ReactHookMUI.stories.tsx'
      ),
      '/mui/',
      '/'
    )
    await replaceRegex(
      getPathToFile('src', 'form', 'final-form', 'FinalFormMUI.stories.tsx'),
      '/mui/',
      '/'
    )
    await moveAllFiles(
      getPathToFile('src', 'form', 'react-hook-form', 'atoms', 'mui')
    )
    await moveAllFiles(
      getPathToFile('src', 'form', 'final-form', 'atoms', 'mui')
    )

    return []
  },
}
