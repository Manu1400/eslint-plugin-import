import docsUrl from '../docsUrl'
const { parse } = require('reflect-type-3')

const message = 'message'

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: docsUrl('reject'), //TODO: add documentation
    },
    fixable: 'code',
  },

  create: function (context) {

    return {
      'Literal[regex]': node => {
        const oldPattern = node.regex.pattern
        // const { flags } = node.regex

        //const newPattern = cleanRegexp(oldPattern, flags)
        const parsed = parse(oldPattern)
        console.log(parsed.alternatives[0].terms[0])
        const ranges = parsed.alternatives[0].terms[0].atom.ranges || []
        const map1 = ranges.map(function(item) {
          // https://fr.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange
            return (item.end === item.start) && item.start <= 122 && item.start >= 97
        })
        const map2 = ranges.map(function(item, index) {
            const next = ranges[index + 1] || {start: -10}
            const isLatest = index == (ranges.length -1)
            const notA = item.start != 97
            return (item.end + 1) == next.start || (isLatest && notA)
        })

        // Handle regex literal inside RegExp constructor in the other handler
        //if (node.parent.type === 'NewExpression' && node.parent.callee.name === 'RegExp') {
        //  return
        //}

        if (ranges.length > 1 && !map1.includes(false) && !map2.includes(false)) {
          console.log("before report")
          context.report({
            node,
            message,
            fix: fixer => fixer,
          })
          //console.error("llldld")
          console.log("after report")
        }
      },
    }
  },
}
