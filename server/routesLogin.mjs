import express from 'express'
import pool from './services/config.mjs'
import fs from 'fs'

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
        pool.query(sqlUser, [username, password], async function (err, results) {
            if (err) { throw err }
            if (results.rows.length > 0) {
                var jsonToString = JSON.stringify(results.rows[0])
                var userInfo = JSON.parse(jsonToString)
                var id = await userInfo['id']
                var pseudo = await userInfo['pseudo']
                saveUserInfo(id, pseudo)
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
    var infoUser = retrieveUsername()
    res.render('home', { getName: infoUser })
})

routerLogin.get('/logout', function (req, res) {
    delete req.user
    res.redirect('/')
})

function saveUserInfo(idUser, pseudoOfUser) {
    var data = { id: idUser, username: pseudoOfUser };
    var jsonToWrite = JSON.stringify(data)
    fs.writeFile('./configUser.json', jsonToWrite, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log("JSON updated")
        }
    })
}

function retrieveUsername() {
    var data = fs.readFileSync('./configUser.json', 'utf8')
    try {
        var dataParse = JSON.parse(data)
        return dataParse['username']
    } catch (err) {
        console.error(err)
    }

    export default routerLogin