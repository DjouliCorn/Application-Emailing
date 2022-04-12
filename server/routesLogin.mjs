import express from 'express'
import pool from './services/config.mjs'

const routerLogin = express.Router()
const sqlUser = 'SELECT * FROM users WHERE pseudo = ? AND password = ?'

routerLogin.get('/', (req, res) => {
    res.render('login')
})

routerLogin.post('/auth', (req, res) => {
    console.log("dans la méthode post")
    let username = req.body.email
    let password = req.body.password

    if (username && password) {
        pool.query(sqlUser, [username, password], function (err, result, field) {
            if (err) { throw err }
            if (result.lenght > 0) {
                res.redirect('/home')
            } else {
                res.send('Incorrect username and/or password')
            }
            res.end
        })
    } else {
        res.send("Please enter a username and password")
        res.end
    }
})

routerLogin.get('/home', (req, res) => {
    res.render('home')
})

export default routerLogin

