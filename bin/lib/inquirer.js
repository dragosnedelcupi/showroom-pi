const inquirer = require('inquirer')
const { FINAL_FORM, RECOIL, TAILWIND } = require('./constants')

const OPEN_API_OPTION = 'openApiOption'
const STRYKER_OPTION = 'strykerOption'

const choices = {
  formtype: [FINAL_FORM, 'react-hook-form', 'none'],
  stateManagement: ['redux', 'none', RECOIL],
  styling: [TAILWIND, 'mui', 'none'],
  ci: ['gitlab', 'none'],
}

const options = [
  {
    type: 'list',
    name: 'formOption',
    message: 'Which form package do you want to use?',
    choices: choices.formtype,
  },
  {
    type: 'list',
    name: 'stateManagementOption',
    message: 'Which global state management do you want to use?',
    choices: choices.stateManagement,
  },
  {
    type: 'confirm',
    name: OPEN_API_OPTION,
    message: 'Use tool for generating APIs and Interfaces?',
    default: false,
  },
  {
    type: 'list',
    name: 'ciOption',
    message: 'Which CI do you want to use?',
    choices: choices.ci,
  },
  {
    type: 'confirm',
    name: 'cypressOption',
    message: 'Use Cypress E2E testing?',
  },
  {
    type: 'confirm',
    name: STRYKER_OPTION,
    message: 'Use Stryker Mutation testing?',
    default: false,
  },
  {
    type: 'list',
    name: 'stylingOption',
    message: 'Which styling solution do you want to use?',
    choices: choices.styling,
  },
  {
    type: 'confirm',
    name: 'boilerplateOption',
    message: 'Keep boilerplate code?',
    default: false,
  },
]
const inquirerOptions = options.reduce((acc, { choices, name, type }) => {
  acc[name] = type === 'confirm' ? [true, false] : choices
  return acc
}, {})

module.exports = {
  packageRemover: async () => ({
    ...(await inquirer.prompt(options)),
    shouldDeletePackageLock: true,
  }),
  inquirerOptions,
  ignoredOptionsForTest: [OPEN_API_OPTION, STRYKER_OPTION],
}
