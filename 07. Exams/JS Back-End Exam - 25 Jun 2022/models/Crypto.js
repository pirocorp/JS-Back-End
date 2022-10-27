const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+/i;

const cryptoSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        minlength: [2, 'Name must be at least 2 characters long'] 
    },
    image: {
        type: String,
        required: true, 
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Invalid URL'
        }
    },
    price: { 
        type: Number, 
        required: true,
        minValue: 0,
    },
    description: { 
        type: String, 
        required: true,
        minlength: [10, 'Description should be a minimum of 10 characters long'] 
    },
    payment: { type: String, enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'], required: true },
    buyers: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, required: true, ref: 'User' }
});

const Crypto = model('Crypto', cryptoSchema);
module.exports = Crypto;