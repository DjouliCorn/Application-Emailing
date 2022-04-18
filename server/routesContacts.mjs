import express from 'express'
import pool from './services/config.mjs'
import fs from 'fs'

const routerContact = express.Router()
const sqlContact = "SELECT * FROM contact"

routerContact.get('/contacts', (req, res) => {
    try {
        var infoUser = retrieveUsername()
        pool.query(sqlContact, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            let jsonData = JSON.stringify(result.rows)
            res.render("allContacts", { getName: infoUser, resultModule: jsonData })
        })
    } catch (err) {
        console.error('Error in routerContacts with get method : /contacts', err.message)
    }
})

routerContact.get('/contacts&idContact=')

function retrieveUsername() {
    var data = fs.readFileSync('./configUser.json', 'utf8')
    try {
        var dataParse = JSON.parse(data)
        return dataParse['username']
    } catch (err) {
        console.error(err)
    }
}

function retrieveIdUser() {
    var data = fs.readFileSync('./configUser.json', 'utf8')
    try {
        var dataParse = JSON.parse(data)
        return dataParse['id']
    } catch (err) {
        console.error(err)
    }
}

export default routerContact