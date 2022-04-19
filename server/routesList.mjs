import express from 'express'
import pool from './services/config.mjs'
import fs from 'fs'

const routerList = express.Router()
const sqlGetList = "SELECT * FROM list"
const sqlAddList = "INSERT INTO list (name, description, creationdate, idUser) VALUES ($1, $2, DATE(NOW()), $3)"
const getOneList = "SELECT * FROM list WHERE id=$1"
const sqlUpdateList = "UPDATE list SET name=$1, description=$2, iduser=$3 WHERE id=$4"
const sqlDeleteList = "DELETE FROM list WHERE id=$1"
const sqlUpdateContact = "UPDATE contact SET idlist=null WHERE idlist=$1"

routerList.get('/contactsList', (req, res) => {
    try {
        var infoUser = retrieveUsername()
        pool.query(sqlGetList, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            let jsonData = JSON.stringify(result.rows)
            res.render("listContacts", {
                getName: infoUser, resultModule: jsonData
            })
        })
    } catch (err) {
        console.error('Error in routerList with get method : /contactsList', err.message)
    }
})

routerList.post('/addList', (req, res) => {
    try {
        const name = req.body.listName
        const description = req.body.listDescription
        var idUser = retrieveIdUser()
        pool.query(sqlAddList, [name, description, idUser], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            res.redirect('http://localhost:3000/contactsList')
        })
    } catch (err) {
        console.error('Error in routerList with get method : /contactsList', err.message)
    }
})

routerList.post('/listModify', (req, res) => {
    try {
        const idList = req.body.id
        const infoUser = retrieveUsername()

        pool.query(getOneList, [idList], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            res.render('modifyList', { getName: infoUser, model: result.rows })
        })
    } catch (err) {
        console.error('Error in routerList with get method : /contactsList', err.message)
    }
})

routerList.post('/listModifyDone', (req, res) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const description = req.body.description
        const idUser = retrieveIdUser()

        pool.query(sqlUpdateList, [name, description, idUser, id], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            res.redirect('http://localhost:3000/contactsList')
        })

    } catch (err) {
        console.error('Error in routerList with get method : /contactsList', err.message)
    }
})

routerList.post('/listDelete', (req, res) => {
    try {
        const id = req.body.id
        pool.query(sqlUpdateContact, [id]).then(() => pool.query(sqlDeleteList, [id], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            res.redirect('http://localhost:3000/contactsList')
        }))

    } catch (err) {
        console.error('Error in routerList with get method : /contactsList', err.message)
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

function retrieveIdUser() {
    var data = fs.readFileSync('./configUser.json', 'utf8')
    try {
        var dataParse = JSON.parse(data)
        return dataParse['id']
    } catch (err) {
        console.error(err)
    }
}

export default routerList