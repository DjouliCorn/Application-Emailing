import express from 'express'
import pool from './services/config.mjs'

const routerMessage = express.Router()
const sqlMessage = 'INSERT INTO message (object, content, idList, idState) VALUES ($2, $3, $1, 4)'
const sqlMessageUpdate = 'UPDATE message SET object = $3, content = $4, idList = $2 , idState = 4 WHERE id=$1'
const sqlMessageDraft = 'UPDATE message SET object = $3, content = $4, idList = $2 WHERE id=$1'
const sqlDraft = 'INSERT INTO message (object, content, idList, idState) VALUES ($2, $3, $1, 1)'
var errorIncorrectInfo = ""

routerMessage.post('/draft', (req, res) => {
    errorIncorrectInfo = ""
    let idList = req.body.destinataire
    let object = req.body.objet
    let content = req.body.message

    if (idList || object || content) {
        pool.query(sqlDraft, [idList, object, content], async function (err, result) {
            if (err) { throw err }
            res.redirect('/home')
            res.end
        })
        pool.end
    } else {
        res.render('home', { getName: "bastien" })
        res.end
    }
})

routerMessage.post('/send', (req, res) => {
    const obj = Object.assign({}, req.body)

    errorIncorrectInfo = ""
    let idList = obj.destinataire
    let object = obj.objet
    let content = obj.message

    if (idList && object && content) {
        pool.query(sqlMessage, [idList, object, content], async function (err, results) {
            if (err) { throw err }
            res.redirect('/sended')
            res.end
        })
        pool.end
    } else {
        res.render('home', {getName: "bastien"})
        res.end
    }
})

routerMessage.post('/sendDraft', (req, res) => {
    const obj = Object.assign({}, req.body)

    errorIncorrectInfo = ""
    let id = obj.id
    let idList = obj.destinataire
    let object = obj.objet
    let content = obj.message

    if (id && idList && object && content) {
        pool.query(sqlMessageUpdate, [id, idList, object, content], async function (err, results) {
            if (err) { throw err }
            res.redirect('/sended')
            res.end
        })
        pool.end
    } else {
        res.render('home', { getName: "bastien" })
        res.end
    }
})


routerMessage.post('/draftTwo', (req, res) => {
    const obj = Object.assign({}, req.body)

    errorIncorrectInfo = ""
    let id = obj.id
    let idList = obj.destinataire
    let object = obj.objet
    let content = obj.message

    if (id && idList && object && content) {
        pool.query(sqlMessageDraft, [id, idList, object, content], async function (err, results) {
            if (err) { throw err }
            res.redirect('/drafted')
            res.end
        })
        pool.end
    } else {
        res.render('home', { getName: "bastien" })
        res.end
    }
})

routerMessage.get('/drafted', (_, res) => {
    res.render('drafted', { getName: "bastien" })
})

routerMessage.get('/sended', (_, res) => {
    res.render('sended', { getName: "bastien" })
})

export default routerMessage

