const ContactSchema = require('./../models/contact')

const insertContact = async data => {
    return await ContactSchema.create(data)
}

const defineFilters = query => {
    if (Object.keys(query).length > 0) {
        let filters = new Array()

        Object.keys(query).map(key => filters.push({ [key]: new RegExp(query[key]) }))

        return { $or: filters, excluded: false }
    } else {
        return { excluded: false }
    }
}

const getContacts = async filters => {
    return await ContactSchema.find(filters)
}

const getContact = async id => {
    return await ContactSchema.findById(id)
}

module.exports = {
    insertContact,
    defineFilters,
    getContacts,
    getContact
}