import { test } from '../../utils'
import { RuleTester } from 'eslint'

const ruleTester = new RuleTester()
    //, rule = require('rules/reject')

import rule from 'rules/reject'

ruleTester.run('reject', rule, {
  valid: [
    test({code: 'const simple = /ab/;'}),
    test({code: 'const simple = /adjc/;'}),
    test({code: 'const simple = /[ad]/;'}),
    test({code: 'const simple = /[a]/;'}),
  ],

  invalid: [
    test({
      code: `const simple = /[abc]/;`,
      errors: [{
        ruleId: 'Reject',
        message: 'message',
      }],
    }),
  ],
})
