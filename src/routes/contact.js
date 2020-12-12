const express = require('express')
const router = express.Router()
const Contact = require('./../controllers/contact')

router.post('/contact', Contact.createContact)

module.exports = router