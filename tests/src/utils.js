import path from 'path'

// warms up the module cache. this import takes a while (>500ms)
import 'babel-eslint'

export function testFilePath(relativePath) {
  return path.join(process.cwd(), './tests/files', relativePath)
}

export const FILENAME = testFilePath('foo.js')

export function test(t) {
  return Object.assign({
    filename: FILENAME,
  }, t, {
    parserOptions: Object.assign({
      sourceType: 'module',
      ecmaVersion: 6,
    }, t.parserOptions),
  })
}

export function testContext(settings) {
  return { getFilename: function () { return FILENAME }
         , settings: settings || {} }
}

export function getFilename(file) {
  return path.join(__dirname, '..', 'files', file || 'foo.js')
}

/**
 * to be added as valid cases just to ensure no nullable fields are going
 * to crash at runtime
 * @type {Array}
 */
export const SYNTAX_CASES = [

]
