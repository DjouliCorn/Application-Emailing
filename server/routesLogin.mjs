import express from 'express'
import pool from './services/config.mjs'

const routerLogin = express.Router()
const sqlUser = 'SELECT * FROM users WHERE pseudo = $1 AND password = $2'
var errorIncorrectInfo = ""
var pseudo = ""

routerLogin.get('/', (_, res) => {
    res.render('login', {
        errorMessage: ""
    })
})

routerLogin.post('/auth', (req, res) => {
    let username = req.body.pseudo
    let password = req.body.password

    errorIncorrectInfo = ""

    if (username && password) {
        pool.query(sqlUser, [username, password], async function (err, results) {
            if (err) { throw err }
            if (results.rows.length > 0) {
                var jsonToString = JSON.stringify(results.rows[0])
                var userInfo = JSON.parse(jsonToString)
                pseudo = await userInfo['pseudo']
                res.redirect('/home')
            } else {
                res.render('login', {
                    errorMessage: "Incorrect username and/or password"
                })
            }
            res.end
        })
        pool.end
    } else {
        res.render('login', {
            errorMessage: "Please enter a username and password"
        })
        res.end
    }
})

routerLogin.get('/home', (req, res) => {
    res.render('home', { getName: "elsa" })
})

routerLogin.get('/logout', function (req, res) {
    delete req.user
    res.redirect('/')
})

export default routerLogin

