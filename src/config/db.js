require('dotenv').config()
const mongoose = require('mongoose')
const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASS
} = process.env
const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 1000
}
const URI_DATABASE = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

console.log(URI_DATABASE)

let db = mongoose.connect(URI_DATABASE, options)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(`Error trying to connect to the database: ${err}`))

module.exports = { db }