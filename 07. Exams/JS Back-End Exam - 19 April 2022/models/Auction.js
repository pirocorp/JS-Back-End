const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+/i;

const auctionSchema = new Schema({
    title: {
        type: String,
        minlength: [4, 'Title should be a minimum of 4 characters long'] 
    },
    description: { 
        type: String, 
        maxlength: [200, 'Description should be a maximum of 200 characters long'] 
    },
    category: {
        type: String, 
        required: true,
        enum: ['Vehicles', 'Real Estate', 'Electronics', 'Furniture', 'Other'],
    },
    image: {
        type: String,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Invalid URL'
        }
    },
    price: { 
        type: Number, 
        required: true,
        min: [0, 'Price cannot be negative'],
    },
    author: {
        type: Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    bidder: {
        type: Types.ObjectId, 
        ref: 'User'
    },
    isClosed: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Auction = model('Auction', auctionSchema);
module.exports = Auction;