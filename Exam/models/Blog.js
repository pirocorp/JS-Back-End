// •	The Title should be at least 5 characters and no longer than 50 characters
// •	The Blog Image should start with http:// or https://
// •	The Content should be a minimum of 10 characters long
// •	The Category should be a minimum of 3 characters long
const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+/i;

const blogSchema = new Schema({
    title: { 
        type: String, 
        minlength: [2, 'Title should be at least 5 characters and no longer than 50 characters'],
        maxlength: [50, 'Title should be at least 5 characters and no longer than 50 characters']
    },
    image: {
        type: String,
        required: true, 
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Invalid Image URL'
        }
    },
    content: {
        type: String,
        required: true,
        minlength: [10, 'Content should be a minimum of 10 characters long']
    },
    category: {
        type: String,
        required: true,
        minlength: [3, 'The Category should be a minimum of 3 characters long']
    },
    date: {
        type: Number,
        required: true
    },
    followers: {
        type: [Types.ObjectId], 
        ref: 'User', 
        default: []
    },
    owner: {
        type: Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },    
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;