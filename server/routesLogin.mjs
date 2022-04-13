import express from 'express'
import pool from './services/config.mjs'

const routerLogin = express.Router()
const sqlUser = 'SELECT * FROM users WHERE pseudo = $1 AND password = $2'
var errorIncorrectInfo = ""

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
        pool.query(sqlUser, [username, password], function (err, results) {
            if (err) { throw err }
            if (results.rows.length > 0) {
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
    res.render('home')
})

export default routerLogin
