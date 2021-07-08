const {
  removeDepsAndScripts,
  moveDependenciesToDevDependencies,
  addToPackageJson,
} = require('../files')
const rimraf = require('rimraf').sync
const fs = require('fs')
const chalk = require('chalk')
const exec = require('child_process').execSync

/**
 * Adds `babel-loader` and `webpack` to the removal list in order to clean up depedencies
 * @param depsToRemove
 */
function addStoryBookConflictingDependencies(depsToRemove) {
  depsToRemove.push('babel-loader', 'webpack')
}

module.exports = async (
  depsToRemove,
  scriptsToRemove,
  shouldDeletePackageLock
) => {
  addStoryBookConflictingDependencies(depsToRemove)
  await removeDepsAndScripts(depsToRemove, scriptsToRemove)
  const excludedBuildSubsetDeps = [
    'cypress',
    '@stryker-mutator/core',
    '@stryker-mutator/jest-runner',
    '@stryker-mutator/typescript',
    '@types/jest',
    'prettier',
  ].filter((depToExclude) => !depsToRemove.includes(depToExclude))
  const excludedTestSubsetDeps = ['cypress'].filter(
    (depToExclude) => !depsToRemove.includes(depToExclude)
  )

  await addToPackageJson({
    subsets: {
      build: {
        exclude: excludedBuildSubsetDeps,
      },
      'test-simple': {
        exclude: excludedTestSubsetDeps,
      },
    },
    husky: {
      hooks: {
        'pre-commit': 'pretty-quick --staged && npm run lint:fix',
      },
    },
  })
  await moveDependenciesToDevDependencies(
    '@stryker-mutator/core',
    '@stryker-mutator/core',
    '@stryker-mutator/jest-runner',
    '@stryker-mutator/typescript',
    '@testing-library/cypress',
    '@testing-library/jest-dom',
    '@testing-library/react',
    '@testing-library/user-event',
    '@types/jest',
    '@types/redux-mock-store',
    'chalk',
    'clear',
    'cypress',
    'eslint-config-airbnb-typescript',
    'eslint-config-prettier',
    'eslint-plugin-cypress',
    'eslint-plugin-prettier',
    'eslint-plugin-only-warn',
    'figlet',
    'inquirer',
    'mutationobserver-shim',
    'redux-devtools-extension',
    'redux-mock-store',
    'rimraf',
    'pretty-error',
    'pretty-error',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/node-logger',
    '@storybook/preset-create-react-app',
    '@storybook/react',
    'husky',
    'pretty-quick',
    'better-npm-audit',
    'autoprefixer',
    'postcss',
    'tailwindcss',
    '@tailwindcss/forms',
    '@tailwindcss/postcss7-compat'
  )

  if (shouldDeletePackageLock) {
    console.log(
      chalk.green.bold(
        'Project is being configured and optimised, please wait...'
      )
    )
    console.log(chalk.red.bold('Do NOT cancel this operation!'))
    rimraf('node_modules')
    if (fs.existsSync('package-lock.json')) {
      rimraf('package-lock.json')
      exec('npm install')
    } else {
      rimraf('yarn.lock')
      exec('yarn install')
    }
    exec('npm run lint:fix')
  }
}
