#!/usr/bin/env node
'use strict'

const args = require('args')
const convert = require('./')

args.option('columns', 'List of column names, defaults to object keys.', [])
args.option('align', 'List of alignment types, applied in order to columns.', [])

const flags = args.parse(process.argv, {
  name: 'tablemark',
  usageFilter (usage) {
    return usage.replace(
      '[options] [command]',
      '<input-file> > <output-file> [options]'
    )
  }
})

const input = args.sub[0]

if ((!input && process.stdin.isTTY)) {
  args.showHelp()
}

const options = {}

if (flags.columns.length > 0) {
  options.columns = flags.columns.map((column, i) => {
    return { name: column, align: flags.align[i] }
  })
} else if (flags.align.length > 0) {
  options.columns = flags.align.map(align => ({ align }))
}

// write results to stdout
console.log(convert(input, options))
