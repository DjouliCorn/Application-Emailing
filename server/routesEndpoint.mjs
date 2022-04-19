import express from 'express'
import pool from './services/config.mjs'

const routerEndpoint = express.Router()
const sqlUsers = 'SELECT COUNT(*) FROM users'
const sqlContact = 'SELECT COUNT(*) FROM contact'
const sqlList = 'SELECT COUNT(*) FROM list'
const sqlMessageSend = 'SELECT COUNT(*) FROM message WHERE idstate=4'
const sqlLastSended = 'SELECT max(id) FROM message WHERE idstate=4'



routerEndpoint.get('/endUser', (req, res) => {
    try {
        pool.query(sqlUsers, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            req.body = result.rows
            res.render("endUser", { model: req.body, getName: "bastien" })
        })
    } catch (err) {
        console.error('Error in routerEndpoint with get method : /endUser', err.message)
    }
})

routerEndpoint.get('/endContact', (req, res) => {
    try {
        pool.query(sqlContact, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            req.body = result.rows
            res.render("endContact", { model: req.body, getName: "bastien" })
        })
    } catch (err) {
        console.error('Error in routerEndpoint with get method : /endContact', err.message)
    }
})

routerEndpoint.get('/endList', (req, res) => {
    try {
        pool.query(sqlList, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            req.body = result.rows
            res.render("endList", { model: req.body, getName: "bastien" })
        })
    } catch (err) {
        console.error('Error in routerEndpoint with get method : /endList', err.message)
    }
})

routerEndpoint.get('/endMailSended', (req, res) => {
    try {
        pool.query(sqlMessageSend, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            req.body = result.rows
            res.render("endMailSended", { model: req.body, getName: "bastien" })
        })
    } catch (err) {
        console.error('Error in routerEndpoint with get method : /endMailSended', err.message)
    }
})

routerEndpoint.get('/lastMailSended', (req, res) => {
    try {
        pool.query(sqlLastSended, [], (err, result) => {
            if (err) {
                return console.error(err.message)
            }
            res.render("lastMailSended", { model: result.rows, getName: "bastien" })
        })
    } catch (err) {
        console.error('Error in routerEndpoint with get method : /lastMailSended', err.message)
    }
})

export default routerEndpoint

