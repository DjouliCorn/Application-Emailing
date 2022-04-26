import express from 'express'
import pool from './services/config.mjs'
import fs from 'fs'

const routerLibelles = express.Router()
const sqlState = 'SELECT * from state'
const sqlLabel = 'INSERT INTO state (label) VALUES ($1)'
const sqlLibelleDelete = "DELETE FROM state WHERE id=$1"
const sqlLibelleSelectionned = "SELECT * FROM state WHERE id=$1"
const sqlLibelleUpdate = 'UPDATE state SET label = $2 WHERE id=$1'
var errorIncorrectInfo = ""


routerLibelles.get('/libelles', (req, res) => {
    try {
        var infoUser = retrieveUsername()
        pool.query(sqlState, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            req.body = result.rows
            res.render("state", { model: result.rows, getName: infoUser })
        })
    } catch (err) {
        console.error('Error in routerLibelles with get method : /libelles', err.message)
    }
})

routerLibelles.get('/addLibelle', (_, res) => {
    res.render('addLibelle', { getName: infoUser })
})

routerLibelles.post('/queryLibelle', (req, res) => {
    const obj = Object.assign({}, req.body)

    errorIncorrectInfo = ""
    let label = obj.label
    var infoUser = retrieveUsername()
    if (label) {
        pool.query(sqlLabel, [label], async function (err, result) {
            if (err) { throw err }
            res.redirect('/libelles')
            res.end
        })
        pool.end
    } else {
        res.render('addLibelle', { getName: infoUser })
        res.end
    }
})

routerLibelles.post('/deleteLibelle', (req, res) => {
    const obj = Object.assign({}, req.body)

    errorIncorrectInfo = ""
    let id = obj.id
    var infoUser = retrieveUsername()
    if (id) {
        pool.query(sqlLibelleDelete, [id], async function (err, results) {
            if (err) { throw err }
            res.redirect('/libelles')
            res.end
        })
        pool.end
    } else {
        res.render('state', { getName: infoUser })
        res.end
    }
})

routerLibelles.post('/modifyLibelle', (req, res) => {

    const obj = Object.assign({}, req.body)

    errorIncorrectInfo = ""
    let id = obj.id
    var infoUser = retrieveUsername()

    if (id) {
        pool.query(sqlLibelleSelectionned, [id], async function (err, results) {
            if (err) { throw err }
            req.body = results.rows
            res.render("modifyLib", { model: results.rows, getName: infoUser })
            res.end
        })
        pool.end
    } else {
        res.render('state', { getName: infoUser })
        res.end
    }
})

routerLibelles.post('/queryModify', (req, res) => {
    const obj = Object.assign({}, req.body)

    errorIncorrectInfo = ""
    let id = obj.id
    let label = obj.label
    var infoUser = retrieveUsername()

    if (id && label) {
        pool.query(sqlLibelleUpdate, [id, label], async function (err, results) {
            if (err) { throw err }
            res.redirect('/modified')
            res.end
        })
        pool.end
    } else {
        res.render('home', { getName: infoUser })
        res.end
    }
})

routerLibelles.get('/modified', (_, res) => {
    var infoUser = retrieveUsername()
    res.render('modified', { getName: infoUser })
})

function retrieveUsername() {
    var data = fs.readFileSync('./configUser.json', 'utf8')
    try {
        var dataParse = JSON.parse(data)
        return dataParse['username']
    } catch (err) {
        console.error(err)
    }
}

export default routerLibelles

