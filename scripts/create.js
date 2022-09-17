'use strict'

const fs = require('fs/promises')
const chalk = require('chalk')
const utils = require('./utils')
const assetsData = require('./data')

const create = async () => {
  const args = utils.getArgsFromTerminal()
  const imageDir = `src/images/${args.file}`
  let isIgnoredImageDir = false

  try {
    await fs.mkdir(imageDir)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw new Error(chalk.red(err.message))
    }

    console.log(chalk.red(`Ignored ${imageDir} because it already exists.`))
    isIgnoredImageDir = true
  }

  const writePathMap = [
    {
      path: `src/js/${args.file}.js`,
      data: new Uint8Array(Buffer.from(assetsData.js)),
    },
    {
      path: `theme/${args.prefix ? `${args.prefix}-` : ''}${args.file}.php`,
      data: new Uint8Array(Buffer.from(assetsData.wp)),
    },
  ]

  writePathMap.map(async ({ path, data }) => {
    try {
      await fs.writeFile(path, data)
    } catch (err) {
      throw new Error(chalk.red(err.message))
    }
  })

  console.log(chalk.green('Congrats!'))
  console.log(chalk.green('The following assets were created.'))

  if (!isIgnoredImageDir) {
    console.log(imageDir)
  }

  writePathMap.map(({ path }) => console.log(path))
}

create()
