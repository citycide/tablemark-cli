'use strict'

const { readFileSync } = require('fs')
const tablemark = require('tablemark')
const isValidPath = require('is-valid-path')

module.exports = (input, options) => {
  options = Object.assign({}, options)

  if (!isValidPath(input)) {
    throw new TypeError('Invalid file path')
  }

  let fileContents = read(input)
  let parsedInput = parse(fileContents)

  return tablemark(parsedInput, options)
}

function read (input) {
  let contents

  try {
    contents = readFileSync(input)
  } catch (e) {
    throw new ReferenceError(
      `Error reading file at ${input} :: ${e.message}`
    )
  }

  return contents
}

function parse (input) {
  let parsed

  try {
    parsed = JSON.parse(input)
  } catch (e) {
    throw new TypeError(
      `Could not parse input as JSON :: ${e.message}`
    )
  }

  if (!Array.isArray(parsed)) {
    parsed = [parsed]
  }

  return parsed
}
