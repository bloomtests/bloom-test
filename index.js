const express = require('express')
const cors = require('cors')
const db = require('./src/config/db')
const app = express()
const PORT = process.env.APP_PORT || 3000
const ContactRoutes = require('./src/routes/contact')

app.use(cors())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ type: 'application/json' }))

app.get('/', (req, res) => res.send('API listening'))
app.use('/api', ContactRoutes)
app.use('*', (req, res) => res.send('API not found'))
app.listen(PORT, (_) => console.log(`API listening on PORT ${PORT}`))

module.exports = app