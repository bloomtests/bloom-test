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

    getContacts(req, res) {
        const query = db.defineFilters(req.query)

        try {
            db.getContacts(query)
                .then(result => {
                    if (result.length < 1) {
                        res.status(204).send({ message: 'No records were found that match your search criteria' })
                    } else {
                        res.status(200).send({ message: `${result.length} records found for your search criteria`, data: result })
                    }
                })
                .catch(err => res.status(400).send({ message: 'We were unable to perform your search at this time. Check that the options have been filled out correctly.' }))
        } catch (e) {
            res.status(500).send({ message: 'We were unable to process your request at this time', error: e })
        }

    }

}
module.exports = new Contact()