import postgres from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = postgres
const env = process.env
const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME
})

export default pool