const { packageRemover, inquirerOptions } = require('./inquirer')

const processedArgs = process.argv.slice(2).reduce((acc, val) => {
  const [param, data] = val.split('=')
  acc[param] = data === 'true' || data === 'false' ? JSON.parse(data) : data
  return acc
}, {})

module.exports = {
  getConfigurationOptions: async () => {
    const args = Object.keys(processedArgs)
    if (args.length === 0) {
      return await packageRemover()
    }
    const inquirerKeys = Object.keys(inquirerOptions)
    const hasNotEnoughParams = args.length !== inquirerKeys.length
    const invalidOptions = inquirerKeys.filter(
      (key) => !inquirerOptions[key].includes(processedArgs[key])
    )
    if (hasNotEnoughParams || invalidOptions.length !== 0) {
      console.log('Valid options:', inquirerOptions)
      console.error('Invalid arguments:', invalidOptions)
      throw new Error('Invalid Arguments, please use arguments presented above')
    }

    return processedArgs
  },
}
