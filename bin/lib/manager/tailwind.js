const {
  getPathToFile,
  replaceLineWithPattern,
  removeReadmeSection,
} = require('../files')
const rimraf = require('rimraf').sync

module.exports = async (keepStory) => {
  await removeReadmeSection('Styling', 2)
  rimraf(getPathToFile('src', 'assets', 'styles'))
  await replaceLineWithPattern(
    getPathToFile('src', 'SetupWrapper.tsx'),
    'style.scss'
  )
  rimraf(getPathToFile('tailwind.config.js'))
  await replaceLineWithPattern(getPathToFile('craco.config.js'), 'plugins')
  if (!keepStory) {
    rimraf(getPathToFile('src', 'form', 'final-form', 'FinalForm.stories.tsx'))
    rimraf(
      getPathToFile('src', 'form', 'react-hook-form', 'ReactHook.stories.tsx')
    )
  }
  return [
    'node-sass',
    '@tailwindcss/forms',
    'autoprefixer',
    '@tailwindcss/postcss7-compat',
    'tailwindcss',
  ]
}
