import express from 'express'

var app = express()
const port = process.env.PORT || 3000
const host = '127.0.0.1'

app.listen(port, host)
console.log('\x1b[36m%s\x1b[0m', `\nListening at http://${host}:${port}`)