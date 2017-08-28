import fs from 'fs'
import test from 'ava'
import { EOL } from 'os'

import fn from './'

const expected = [
  'name | repo | desc',
  '----- | ----- | -----',
  'trilogy | [citycide/trilogy](https://github.com/citycide/trilogy) | No-hassle SQLite with type-casting schema models and support for native & pure JS backends.',
  'strat | [citycide/strat](https://github.com/citycide/strat) | Functional-ish JavaScript string formatting, with inspirations from Python.',
  'tablemark-cli | [citycide/tablemark-cli](https://github.com/citycide/tablemark-cli) | Generate markdown tables from JSON data at the command line.'
].join(EOL) + EOL

const inputPath = './fixtures/input.json'

// see the `tablemark` module for more tests

test('outputs the expected markdown from path', t => {
  let result = fn(inputPath)
  t.is(result, expected)
})

test('outputs the expected markdown from stdin', t => {
  let result = fn(null, fs.readFileSync(inputPath))
  t.is(result, expected)
})
