import express from 'express'
import pool from './services/config.mjs'

const routerMail = express.Router()
const sqlMail = "SELECT * FROM message"
const sqlMailSend = "SELECT * FROM message WHERE idstate=4"
const sqlMailDraft = "SELECT * FROM message WHERE idstate=1"
const sqlMailSelectionned = "SELECT * FROM message WHERE id=$1"
const sqlMailDelete = "DELETE FROM message WHERE id=$1"
var errorIncorrectInfo = ""

routerMail.get('/mail', (req, res) => {
    const obj = Object.assign({}, req.body)
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

routerMail.post('/homeDraft', (req, res) => {

    const obj = Object.assign({}, req.body)

    errorIncorrectInfo = ""
    let id = obj.id

    if (id) {
        pool.query(sqlMailSelectionned, [id], async function (err, results) {
            if (err) { throw err }
            req.body = results.rows
            res.render("homeDraft", { model: results.rows, getName: "bastien" })
            res.end
        })
        pool.end
    } else {
        res.render('draft', { getName: "bastien" })
        res.end
    }
})

routerMail.post('/deleteMail', (req, res) => {
    const obj = Object.assign({}, req.body)

    errorIncorrectInfo = ""
    let id = obj.id

    if (id) {
        pool.query(sqlMailDelete, [id], async function (err, results) {
            if (err) { throw err }
            res.redirect('/mailDraft')
            res.end
        })
        pool.end
    } else {
        res.redirect("http://127.0.0.1:3000/mailDraft")
        res.end
    }
})

export default routerMail

