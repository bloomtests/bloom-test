const { Schema, model } = require('mongoose')

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone: [{
        type: String,
        trim: true
    }],
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        number: {
            type: String,
            required: true,
            trim: true
        },
        neighborhood: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2
        },
        zipCode: {
            type: String,
            required: true,
            trim: true,
            maxlength: 8
        }
    },
    excluded: {
        type: Boolean,
        default: false
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = model('Contact', ContactSchema)