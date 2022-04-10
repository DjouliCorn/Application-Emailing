import express from 'express'
import morgan from 'morgan'
import routerContact from './routesContacts.mjs'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()

var app = express()
const port = process.env.PORT || 3000
const host = '127.0.0.1'

app.use(bodyParser.json())
app.use(routerContact)
app.use(morgan('tiny'))

app.listen(port, host)
console.log('\x1b[36m%s\x1b[0m', `\nListening at http://${host}:${port}`)