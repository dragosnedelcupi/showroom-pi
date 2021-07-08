const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const PrettyError = new (require('pretty-error'))()
const { getRootDirectory } = require('./lib/files')
const {
  formManager,
  ciManager,
  cypressManager,
  openApiManager,
  boilerplateManger,
  strykerManager,
  setupCleaner,
  dependenciesCleaner,
  stylingManager,
  stateManager,
} = require('./lib/manager')
const process = require('process')

const { getConfigurationOptions } = require('./lib/optionsConfigurator')

clear()
console.log(
  chalk.yellow.bgGrey(
    figlet.textSync(' PI Template Setup ', { horizontalLayout: 'full' })
  )
)

/**
 * Runs all necessary scripts to setup a freshly created project.
 * Order of calls is HIGHLY important.
 * Exhaustive testing should be done if their order or behaviour is changed
 *
 * @returns {Promise<*[]>}
 */
const run = async () => {
  process.chdir(getRootDirectory())
  const {
    formOption,
    openApiOption,
    ciOption,
    cypressOption,
    strykerOption,
    stylingOption,
    boilerplateOption,
    stateManagementOption,
    shouldDeletePackageLock
  } = await getConfigurationOptions()

  await boilerplateManger[boilerplateOption](formOption)
  await openApiManager[openApiOption]()
  const stylingDepsToRemove = await stylingManager[stylingOption]()
  const formDepsToRemove = await formManager[formOption](boilerplateOption)
  const stateDepsToRemove = await stateManager[stateManagementOption](
    boilerplateOption,
    cypressOption
  )
  const [cypressDepsToRemove, cypressScriptsToRemove] = await cypressManager[
    cypressOption
  ]()
  const [strykerDepsToRemove, strykerScriptsToRemove] = await strykerManager[
    strykerOption
  ]()
  const cleanupDepsToRemove = await setupCleaner()
  await ciManager[ciOption]()
  const allDepsToRemove = [
    ...formDepsToRemove,
    ...stateDepsToRemove,
    ...cypressDepsToRemove,
    ...strykerDepsToRemove,
    ...stylingDepsToRemove,
    ...cleanupDepsToRemove,
  ]
  const allScriptsToRemove = [
    ...cypressScriptsToRemove,
    ...strykerScriptsToRemove,
  ]
  await dependenciesCleaner(allDepsToRemove, allScriptsToRemove, shouldDeletePackageLock)

  const possibleExperimentalFeature = [stateManagementOption]

  return possibleExperimentalFeature.filter((option) =>
    `${option}`.includes('experimental')
  )
}

run()
  .then((experimentalFeatures) => {
    console.log(chalk.green.bgGrey('Project configured successfully!'))
    if (experimentalFeatures.length > 0) {
      console.log(
        chalk.green('Project contains following experimental features:'),
        chalk.redBright(experimentalFeatures)
      )
      console.log(chalk.red.bold('Project should NOT be used for production!'))
    }
  })
  .catch((e) => {
    console.log(PrettyError.render(e))
    console.log(
      chalk.cyan(
        'Oops, something went wrong!\nPlease revert to initial commit or contact maintainers'
      )
    )
  })
