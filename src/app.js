const http = require('http')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
// const promisify = require('util').promisify
// const stat = promisify(fs.stat)
// const readdir = promisify(fs.readdir)

const conf = require('./config/defaultConfig.js')

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url)
  fs.stat(filePath, (err, stas) => {
    if (err) {
      res.statusCode = 400
      res.setHeader('Content-Type', ' text/plain')
      res.end(`${filePath} is not a directory or file`)
    } else if (stas.isFile()) {
      // 文件
      res.statusCode = 200
      res.setHeader('Content-Type', ' text/plain')
      fs.createReadStream(filePath).pipe(res)
    } else if (stas.isDirectory()) {
      // 文件夹
      fs.readdir(filePath, (err, files) => {
        if (!err) {
          res.statusCode = 200
          res.setHeader('Content-Type', ' text/plain')
          res.end(files.join(','))
        }
      })
    }
  })
  res.statusCode = 200
  res.setHeader('Content-Type', ' text/html')
  res.end(filePath)
})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`server started at ${chalk.green(addr)}`)
})
