const db = require('./../db/contact')
const ErrorHandler = require('./error-handler')

class Contact {

    createContact(req, res) {
        const body = req.body

        try {
            db.insertContact(body)
                .then(() => res.status(201).send({ message: 'Contact saved successfully' }))
                .catch(err => res.status(400).send({ message: 'The contact could not be saved. Check for errors', errors: ErrorHandler.errorFailedValidationContact(err) }))
        } catch (e) {
            res.status(500).send({ message: 'We were unable to process your request at this time', error: e })
        }

    }

}
module.exports = new Contact()