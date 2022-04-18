import express from 'express'
import pool from './services/config.mjs'

const routerLibelles = express.Router()
const sqlState = 'SELECT * from state'
const sqlLabel = 'INSERT INTO state (label) VALUES ($1)'
var errorIncorrectInfo = ""


routerLibelles.get('/libelles', (req, res) => {
    try {
        pool.query(sqlState, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            req.body = result.rows
            res.render("state", { model: result.rows, getName: "bastien" })
        })
    } catch (err) {
        console.error('Error in routerLibelles with get method : /libelles', err.message)
    }
})

routerLibelles.get('/addLibelle', (_, res) => {
    res.render('addLibelle', { getName: "bastien" })
})

routerLibelles.post('/queryLibelle', (req, res) => {
    const obj = Object.assign({}, req.body)

    errorIncorrectInfo = ""
    let label = obj.label

    console.log(label)

    if (label) {
        pool.query(sqlLabel, [label], async function (err, result) {
            if (err) { throw err }
            res.redirect('/libelles')
            res.end
        })
        pool.end
    } else {
        res.render('addLibelle', { getName: "bastien" })
        res.end
    }
})


export default routerLibelles

