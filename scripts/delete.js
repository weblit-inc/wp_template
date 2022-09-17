'use strict'

const fs = require('fs')
const del = require('del')
const chalk = require('chalk')
const prompts = require('prompts')
const utils = require('./utils')

const delAssets = async () => {
  const args = utils.getArgsFromTerminal()
  const targetPathArr = [
    `src/images/${args.file}`,
    `src/js/${args.file}.js`,
    `theme/${args.prefix ? `${args.prefix}-` : ''}${args.file}.php`,
  ]
  const delPathArr = []

  targetPathArr.forEach((path) => {
    if (fs.existsSync(path)) {
      delPathArr.push(path)
    }
  })

  if (delPathArr.length === 0) {
    console.log(chalk.green('No assets to delete.'))
    return
  }

  const getDelMsg = () => {
    let msg = chalk.red('The following assets will be deleted.')

    delPathArr.forEach((path) => {
      msg += `
${path}`
    })

    return `${msg}
${chalk.red('Run seriously? (y/N):')}`
  }

  const res = await prompts({
    type: 'text',
    name: 'isRun',
    message: getDelMsg(),
  })

  if (res.isRun !== 'y') {
    console.log(chalk.red('Canceled.'))
    return
  }

  delPathArr.forEach((path) => {
    try {
      del(path)
    } catch (err) {
      throw new Error(chalk.red(err.message))
    }
  })

  console.log(chalk.green('Congrats!'))
  console.log(chalk.green('Assets were deleted!'))
}

delAssets()
