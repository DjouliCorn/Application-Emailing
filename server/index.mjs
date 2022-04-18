import express from 'express'
import morgan from 'morgan'
import routerContact from './routesContacts.mjs'
import routerLogin from './routesLogin.mjs'
import routerMessage from './routesMessage.mjs'
import routerMail from './routesMail.mjs'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path from 'path'
//import session from 'express-session'

dotenv.config()

var app = express()
const port = process.env.PORT || 3000
const host = '127.0.0.1'
const __dirname = path.resolve();

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"))
app.use(express.static('../public'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routerContact)
app.use(routerLogin)
app.use(routerMessage)
app.use(routerMail)
app.use(morgan('tiny'))

app.listen(port, host)
console.log('\x1b[36m%s\x1b[0m', `\nListening at http://${host}:${port}`)