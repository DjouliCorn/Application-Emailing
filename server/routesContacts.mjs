import express from 'express'
import pool from './services/config.mjs'

const routerContact = express.Router()
const sqlContact = "SELECT * FROM contact"

routerContact.get('/contacts', (req, res) => {
    try {
        pool.query(sqlContact, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            req.body = result.rows
            res.render("contacts", { model: result.rows })
        })
    } catch (err) {
        console.error('Error in routerContacts with get method : /contacts', err.message)
    }
})

export default routerContact