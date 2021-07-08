const fs = require('fs').promises
const path = require('path')
const { PACKAGE_JSON, README, ESLINTRC } = require('./constants')

const replaceRegexRecursively = async (currentFile, regex, replacement) => {
  const fileStats = await fs.lstat(currentFile)
  if (fileStats.isDirectory()) {
    const recursivePromises = (await fs.readdir(currentFile)).map((fileName) =>
      replaceRegexRecursively(
        path.join(currentFile, fileName),
        regex,
        replacement,
      ),
    )
    await Promise.all(recursivePromises)
    return
  }
  if (fileStats.isFile()) {
    await files.replaceRegex(currentFile, regex, replacement)
  }
}

const files = {
  getPathToFile: (...pathElements) => {
    return path.join(...pathElements)
  },
  getRootDirectory: () => {
    return path.join(__dirname, '..', '..')
  },
  moveAllFiles: async (
    from,
    levels = 1,
    regex = '\'\\.\\./',
    replacement = '\'',
  ) => {
    const fileStats = await fs.lstat(from)
    if (!fileStats.isDirectory()) {
      return
    }
    const fileNames = await fs.readdir(from)
    const newFiles = []
    for (let fileName of fileNames) {
      const fromPathArray = from.split(path.sep)
      const oldPath = path.join(...fromPathArray, fileName)
      const newPath = path.join(...fromPathArray.slice(0, -levels), fileName)
      await fs.rename(oldPath, newPath)
      newFiles.push(newPath)
    }

    for (let movedFile of newFiles) {
      await replaceRegexRecursively(movedFile, regex, replacement)
    }
  },
  removeDepsAndScripts: async (dependencyList, scriptList = []) => {
    const data = await files.handleReadFile(PACKAGE_JSON)
    const packageJson = JSON.parse(data.toString('utf-8'))

    dependencyList.forEach((dependency) => {
      if (
        typeof dependency === 'string' &&
        packageJson.dependencies[dependency]
      ) {
        delete packageJson.dependencies[dependency]
      }
    })
    scriptList.forEach((script) => {
      if (packageJson.scripts[script]) {
        delete packageJson.scripts[script]
      }
    })
    await fs.writeFile(PACKAGE_JSON, JSON.stringify(packageJson, null, 2))
  },
  removeCypressEslintConfig: async ()=>{
    const data = await files.handleReadFile(ESLINTRC)
    const eslintrc = JSON.parse(data.toString('utf-8'))

    eslintrc.parserOptions.project = eslintrc.parserOptions.project.filter(p => !p.includes("cypress"))
    eslintrc.plugins= eslintrc.plugins.filter(p => !p.includes("cypress"))
    eslintrc.extends= eslintrc.extends.filter(p => !p.includes("cypress"))

    await fs.writeFile(ESLINTRC, JSON.stringify(eslintrc, null, 2))
  },
  removeRegexFromScripts: async (toRemove, ...scripts) => {
    const data = await files.handleReadFile(PACKAGE_JSON)
    const packageJson = JSON.parse(data.toString('utf-8'))

    scripts.forEach(script => {
      packageJson.scripts[script] = packageJson.scripts[script].replace(toRemove, toRemove)
    })
    await fs.writeFile(PACKAGE_JSON, JSON.stringify(packageJson, null, 2))
  },
  moveDependenciesToDevDependencies: async (...dependencyList) => {
    const data = await files.handleReadFile(PACKAGE_JSON)
    const packageJson = JSON.parse(data.toString('utf-8'))

    packageJson.devDependencies = dependencyList.reduce((acc, dep) => {
      if (packageJson.dependencies[dep]) {
        acc[dep] = packageJson.dependencies[dep]
        delete packageJson.dependencies[dep]
      }

      return acc
    }, {})
    await fs.writeFile(PACKAGE_JSON, JSON.stringify(packageJson, null, 2))
  },
  addToPackageJson: async (newData) => {
    const data = await files.handleReadFile(PACKAGE_JSON)
    const packageJson = JSON.parse(data.toString('utf-8'))

    const newPackageJson = JSON.stringify(
      { ...packageJson, ...newData },
      null,
      2,
    )
    await fs.writeFile(PACKAGE_JSON, newPackageJson)
  },
  replaceLineWithPattern: async (filePath, regex, replacement = '') => {
    const data = await files.handleReadFile(filePath)
    const replaced = data
      .toString('utf-8')
      .replace(new RegExp(`.*${regex}.*\n?`, 'g'), replacement)
    await fs.writeFile(filePath, replaced)
  },
  removeAllFromRegexToRegex: async (filePath, from, to, nextLineCount = 2) => {
    const data = await files.handleReadFile(filePath)
    const lines = data.toString('utf-8').split('\n')
    const firstIndex = lines.findIndex((line) => line.includes(from))
    const secondIndex = to
      ? lines.findIndex((line) => line.includes(to))
      : firstIndex
    if (firstIndex === -1 || secondIndex === -1) {
      throw new Error('File changed')
    }
    lines.splice(firstIndex, secondIndex - firstIndex + nextLineCount)
    await fs.writeFile(filePath, lines.join('\n'))
  },
  replaceRegex: async (filePath, regex, replacement = '') => {
    const data = await files.handleReadFile(filePath)
    const replaced = data
      .toString('utf-8')
      .replace(new RegExp(regex, 'g'), replacement)

    await fs.writeFile(filePath, replaced)
  },
  removeReadmeSection: async (headingText, headingDepth = 1) => {
    await files.replaceRegex(
      files.getPathToFile(README),
      new RegExp(
        `\\n${'#'.repeat(
          headingDepth,
        )}[ ]*${headingText}[\\s\\S]*?(?=\\n#${'(#|[^#])'.repeat(
          headingDepth - 1,
        )}[^#]|$)`,
      ),
      '',
    )
  },
  removeEmptyDirectories: async (directory) => {
    const fileStats = await fs.lstat(directory)
    if (!fileStats.isDirectory()) {
      return
    }
    let fileNames = await fs.readdir(directory)
    if (fileNames.length > 0) {
      const recursiveRemovalPromises = fileNames.map((fileName) =>
        files.removeEmptyDirectories(path.join(directory, fileName)),
      )
      await Promise.all(recursiveRemovalPromises)
      fileNames = await fs.readdir(directory)
    }

    if (fileNames.length === 0) {
      await fs.rmdir(directory)
    }
  },
  handleReadFile: async (file) => {
    try {
      return await fs.readFile(file)
    } catch (e) {
      throw new Error('Could not read: ' + file)
    }
  },
}

module.exports = files
