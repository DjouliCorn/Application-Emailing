import express from 'express'
import pool from './services/config.mjs'

const routerMessage = express.Router()
const sqlMessage = 'INSERT INTO message (object, content, idList, idState) VALUES ($2, $3, $1, 4)'
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
        res.render('home', {
            errorMessage: "Aucun champ rempli"
        })
        res.end
    }
})

routerMessage.post('/send', (req, res) => {
    const obj = Object.assign({}, req.body)

    errorIncorrectInfo = ""
    let idList = obj.destinataire
    let object = obj.objet
    let content = obj.message

    console.log(obj)

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


routerMessage.get('/sended', (_, res) => {
    res.render('sended', { getName: "bastien" })
})

export default routerMessage

