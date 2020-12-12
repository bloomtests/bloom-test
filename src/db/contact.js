const ContactSchema = require('./../models/contact')

const insertContact = async data => {
    return await ContactSchema.create(data)
}

module.exports = {
    insertContact
}