const db = require('./../db/contact')
const ErrorHandler = require('./error-handler')
const { getWeatherInfo } = require('./../api/weather')

class Contact {

    createContact(req, res) {
        const body = db.removeExcluded(req.body)

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
                .catch(() => res.status(400).send({ message: 'We were unable to perform your search at this time. Check that the options have been filled out correctly.' }))
        } catch (e) {
            res.status(500).send({ message: 'We were unable to process your request at this time', error: e })
        }

    }

    getContact(req, res) {
        const { id } = req.params

        try {
            db.getContact(id)
                .then(result => {
                    if (!result) {
                        res.status(204).send({ message: 'No records were found that match your search criteria' })
                    } else {
                        const city = result['address']['city']
                        getWeatherInfo(city)
                            .then(message => res.status(200).send({ contact: result, message: message }))
                    }
                })
                .catch(() => res.status(400).send({ message: 'We were unable to perform your search at this time.' }))
        } catch (e) {
            res.status(500).send({ message: 'We were unable to process your request at this time', error: e })
        }

    }

    updateContact(req, res) {
        const { id } = req.params
        const body = db.removeExcluded(req.body)

        try {
            db.updateContact(id, body)
                .then(result => {
                    if (result['nModified'] > 0) {
                        res.status(200).send({ message: 'Contact updated successfully' })
                    } else {
                        res.status(200).send({ message: 'No records were updated' })
                    }
                })
                .catch(err => res.status(400).send({ message: 'There was a problem updating the contact', error: err }))
        } catch (e) {
            res.status(500).send({ message: 'We were unable to process your request at this time', error: e })
        }
    }

    deleteContact(req, res) {
        const { id } = req.params

        try {
            db.deleteContact(id)
                .then(result => {
                    if (result['nModified'] > 0) {
                        res.status(200).send({ message: 'Contact excluded successfully' })
                    } else {
                        res.status(200).send({ message: 'No records were deleted' })
                    }
                })
                .catch(err => res.status(400).send({ message: 'There was a problem deleting the contact', error: err }))
        } catch (e) {
            res.status(500).send({ message: 'We were unable to process your request at this time', error: e })
        }
    }

}
module.exports = new Contact()