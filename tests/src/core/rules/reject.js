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
    test({code: 'const simple = /[`a]/;'}),
    test({code: 'const simple = /[z{]/;'}),
    test({code: 'const simple = /[a][b]/;'}),
    test({code: 'const simple = /[a]+[b]/;'}),
  ],

  invalid: [
    test({
      code: `const simple = /[abc]/;`,
      errors: [{
        ruleId: 'Reject',
        message: 'message',
      }],
      output: 'const simple = /[a-c]/ ;',
    }),
    test({
      code: `const simple = /[abc]{1,2}/;`,
      errors: [{
        ruleId: 'Reject',
        message: 'message',
      }],
      output: 'const simple = /[a-c]{1,2}/ ;',
    }),
    test({
      code: `const simple = /[^abc]/;`,
      errors: [{
        ruleId: 'Reject',
        message: 'message',
      }],
      output: 'const simple = /[^a-c]/ ;',
    }),
    test({
      code: `const simple = /[^abc]+/;`,
      errors: [{
        ruleId: 'Reject',
        message: 'message',
      }],
      output: 'const simple = /[^a-c]+/ ;',
    }),
    test({
      code: `const simple = /[cba]/;`,
      errors: [{
        ruleId: 'Reject',
        message: 'message',
      }],
    }),
    test({
      code: `const simple = /[a]/;`,
      errors: 0,
    }),
  ],
})
