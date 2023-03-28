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
// const URI_DATABASE = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
const URI_DATABASE = "mongodb://uktqt6mnepolhq06nr7b:F8pooGYS3OdiNancoa1w@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bhr3fwwgpbgn2de?replicaSet=rs0"

let db = mongoose.connect(URI_DATABASE, options)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(`Error trying to connect to the database: ${err}`))

module.exports = { db }