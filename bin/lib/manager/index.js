const { getPathToFile, moveAllFiles, replaceRegex } = require('../files')
const rimraf = require('rimraf').sync
const {
  README,
  GITLAB_CI,
  FINAL_FORM,
  RECOIL,
  TAILWIND,
} = require('../constants')
const setupCleaner = require('./setupCleaner')
const dependenciesCleaner = require('./dependencyCleaner')
const removeTailwind = require('./tailwind')
const { removeMUI, replaceDefaultWithMUI } = require('./mui')
const removeCypress = require('./cypress')
const removeOpenApi = require('./openApi')
const removeStryker = require('./stryker')
const removeFinalForm = require('./finalForm')
const removeReactFormHook = require('./reactHookForm')
const removeRecoil = require('./recoil')
const removeRedux = require('./redux')
const removeBoilerplateCode = require('./boilerplate')

// nothing to do, returns array of arrays in order to be compatible
const doNothing = () => [[], []]

const removeFormSolutions = async (exclude, ...otherProps) => {
  const formSolutionsRemovalFunc = {
    'final-form': removeFinalForm,
    'react-hook-form': removeReactFormHook,
  }
  if (exclude) {
    delete formSolutionsRemovalFunc[exclude]
  }

  const allFormDepsToRemove = []
  for (const func of Object.values(formSolutionsRemovalFunc)) {
    allFormDepsToRemove.push(...(await func(...otherProps)))
  }

  if (!exclude) {
    await replaceRegex(
      getPathToFile(README),
      /\n## IMPORTANT: Form Solutions[\s\S]*?(?=\n##|$)/,
      ''
    )
  }

  if (exclude) {
    await moveAllFiles(
      getPathToFile('src', 'form', exclude),
      1,
      "'\\.\\./\\.\\./",
      "'../"
    )
  }

  return allFormDepsToRemove
}

const removeStateManagementSolutions = async (exclude, ...otherProps) => {
  const stateManagementSolutionsRemovalFunc = {
    [RECOIL]: removeRecoil,
    redux: removeRedux,
  }

  if (exclude) {
    delete stateManagementSolutionsRemovalFunc[exclude]
  }

  const stateDepsToRemove = []
  for (const func of Object.values(stateManagementSolutionsRemovalFunc)) {
    stateDepsToRemove.push(...(await func(...otherProps)))
  }

  return stateDepsToRemove
}

const formManager = {
  [FINAL_FORM]: async (...args) =>
    await removeFormSolutions('final-form', ...args),
  'react-hook-form': async (...args) =>
    await removeFormSolutions('react-hook-form', ...args),
  none: async (...args) => await removeFormSolutions(null, ...args),
}

const stateManager = {
  redux: (...args) => removeStateManagementSolutions('redux', ...args),
  [RECOIL]: (...args) => removeStateManagementSolutions(RECOIL, ...args),
  none: (...args) => removeStateManagementSolutions(null, ...args),
}

const ciManager = {
  gitlab: doNothing,
  none: () => rimraf(GITLAB_CI),
}

const openApiManager = {
  [false]: removeOpenApi,
  [true]: doNothing,
}

const cypressManager = {
  [false]: removeCypress,
  [true]: doNothing,
}

const strykerManager = {
  [false]: removeStryker,
  [true]: doNothing,
}

const stylingManager = {
  [TAILWIND]: removeMUI,
  mui: async () => (await replaceDefaultWithMUI()) && (await removeTailwind()),
  none: async () => {
    const styleDeps = await removeTailwind(true)
    const styleDepsMui = await removeMUI()

    return styleDeps.concat(styleDepsMui)
  },
}

const boilerplateManger = {
  [false]: removeBoilerplateCode,
  [true]: doNothing,
}

module.exports = {
  formManager,
  ciManager,
  openApiManager,
  cypressManager,
  strykerManager,
  setupCleaner,
  dependenciesCleaner,
  stylingManager,
  boilerplateManger,
  stateManager,
}
