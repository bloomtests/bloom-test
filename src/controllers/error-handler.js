class ErrorHandler {

    errorFailedValidationContact(err) {
        const errors = new Object(err['errors'])
        let messageErrors = new Array()

        Object.keys(errors).map(key => {
            if (errors[key]['name'] === 'ValidatorError') {
                messageErrors.push({
                    field: errors[key]['properties']['path'],
                    message: errors[key]['message']
                })
            } else {
                messageErrors.push({
                    error: errors[key]
                })
            }

        })

        return messageErrors
    }

}
module.exports = new ErrorHandler()