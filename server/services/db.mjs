import pkg from 'pg'
import configPg from '../config.mjs'

const { Pool } = pkg

const pool = new Pool(configPg.db)

async function displayRows(query) {
    const rows = await pool.query(query)

    return rows
}

export default displayRows