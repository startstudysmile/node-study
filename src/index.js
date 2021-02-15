// process.argv()
// commmandar / yargs

const yargs = require('yargs')
const argv = yargs
  .usage('anywhare [options]')
  .option('p', { alias: 'port', describe: '端口号', defalut: '8080' })
  .option('h', { alias: 'hostname', describe: 'host', defalut: '127.0.0.1' })
  .option('d', { alias: 'root', describe: 'root path', defalut: process.cwd() })
  .version()
  .alias('v', 'version')
  .help()
  .argv()
 