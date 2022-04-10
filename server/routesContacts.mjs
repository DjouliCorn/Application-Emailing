import express from 'express'
import pool from './services/config.mjs'

const routerContact = express.Router()
const sql = "SELECT * FROM contact"

routerContact.get('/contacts', (req, res) => {
    try {
        pool.query(sql, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            //res.render("contacts", { model: result.rows })
            req.body = result.rows
            res.send(req.body)
        })
    } catch (err) {
        console.error('Error in routerContacts with get method', err.message)
    }
})

export default routerContact