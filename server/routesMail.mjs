import express from 'express'
import pool from './services/config.mjs'

const routerMail = express.Router()
const sqlMail = "SELECT * FROM message"
const sqlMailSend = "SELECT * FROM message WHERE idstate=4"
const sqlMailDraft = "SELECT * FROM message WHERE idstate=1"
const sqlMailSelectionned = "SELECT * FROM message WHERE id=1"

routerMail.get('/mail', (req, res) => {
    try {
        pool.query(sqlMail, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            req.body = result.rows
            res.render("mails", { model: result.rows, getName: "bastien" })
        })
    } catch (err) {
        console.error('Error in routerMail with get method : /mail', err.message)
    }
})

routerMail.get('/mailSended', (req, res) => {
    try {
        pool.query(sqlMailSend, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            req.body = result.rows
            res.render("send", { model: result.rows, getName: "bastien" })
        })
    } catch (err) {
        console.error('Error in routerMail with get method : /mailSended', err.message)
    }
})

routerMail.get('/mailDraft', (req, res) => {
    try {
        pool.query(sqlMailDraft, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            req.body = result.rows
            res.render("draft", { model: result.rows, getName: "bastien" })
        })
    } catch (err) {
        console.error('Error in routerMail with get method : /mailDraft', err.message)
    }
})

routerMail.get('/homeDraft', (req, res) => {
    try {
        pool.query(sqlMailSelectionned, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            req.body = result.rows
            res.render("homeDraft", { model: result.rows, getName: "bastien" })
        })
    } catch (err) {
        console.error('Error in routerMail with get method : /homeDraft', err.message)
    }
})


export default routerMail

