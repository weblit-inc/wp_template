'use strict'

const chalk = require('chalk')
const commandLineArgs = require('command-line-args')

const getArgsFromTerminal = () => {
  const options = commandLineArgs([
    {
      name: 'file',
      alias: 'f',
      type: String,
    },
    {
      name: 'prefix',
      alias: 'p',
      type: String,
    },
  ])

  if (!options.file) {
    throw new Error(chalk.red('Please try again after specifying -f [name].'))
  }

  return options
}

module.exports = {
  getArgsFromTerminal,
}
