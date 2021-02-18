const BenchMark = require('benchmark')
const suite = new BenchMark.Suite()

suite
  .add('parseInt', () => {})
  .add('number', () => {})
  .on('cycle', event => {
    console.info(String(event.target))
  })
  .on('complete', function() {
    console.info(this.filter('fastest').map('name'))
  })
  .run({ async: true })
