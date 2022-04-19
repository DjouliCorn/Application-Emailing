import express from 'express'
import pool from './services/config.mjs'
import fs from 'fs'

const routerContact = express.Router()
const sqlContact = "SELECT * FROM contact"
const sqlModifyContact = "SELECT * FROM contact WHERE id=$1"
const sqlGetList = "SELECT * FROM list"
const sqlUpdateContact = "UPDATE contact SET name=$1, firstname=$2, lastname=$3, mail=$4 WHERE id=$5"
const sqlDeleteContact = "DELETE FROM contact WHERE id=$1 "
const sqlAddContact = "INSERT INTO contact (name, firstname, lastname, mail, idlist) VALUES ($1, $2, $3, $4, $5)"

routerContact.get('/contacts', (_, res) => {
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

routerContact.post('/contactModify', (req, res) => {
    try {
        var idContact = req.body.id
        var infoUser = retrieveUsername()

        pool.query(sqlModifyContact, [idContact], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            res.render("modifyContact", { getName: infoUser, model: result.rows })
        })
    } catch (err) {
        console.error('Error in routerContacts with get method : /contacts/modify', err.message)
    }
})

routerContact.post('/contactModifyDone', (req, res) => {
    try {
        const id = req.body.id
        const nickname = req.body.name
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const mail = req.body.mail

        pool.query(sqlUpdateContact, [nickname, firstname, lastname, mail, id], (err, _) => {
            if (err) {
                return console.error(err.message)
            }
            res.redirect("http://localhost:3000/contacts")
        })

    } catch (err) {
        console.error('Error in routerContacts with get method : /contacts/modify', err.message)
    }
})

routerContact.post('/deleteContact', (req, res) => {
    try {
        const idContact = req.body.id

        pool.query(sqlDeleteContact, [idContact], (err, _) => {
            if (err) {
                return console.error(err.message)
            }
            res.redirect("http://localhost:3000/contacts")
        })
    } catch (err) {
        console.error('Error in routerContacts with get method : /contacts/modify', err.message)
    }
})

routerContact.get('/addNewContact', (_, res) => {
    try {
        var infoUser = retrieveUsername()
        pool.query(sqlGetList, (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            let jsonData = JSON.stringify(result.rows)
            res.render('addNewContact', { getName: infoUser, model: jsonData })
        })
    } catch (err) {
        console.error('Error in routerContacts with get method : /addNewContact', err.message)
    }
})

routerContact.post('/sendNewContact', (req, res) => {
    try {
        const name = req.body.name
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const mail = req.body.mail
        const list = req.body.list

        pool.query(sqlAddContact, [name, firstname, lastname, mail, list], (err, _) => {
            if (err) {
                return console.error(err.message)
            }
            res.redirect("http://localhost:3000/contacts")
        })
    } catch (err) {
        console.error('Error in routerContacts with get method : /sendNewContact', err.message)
    }
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

export default routerContact