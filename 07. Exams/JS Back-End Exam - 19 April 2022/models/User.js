const { Schema, model } = require('mongoose');

const EMAIL_PATTERN = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-z]+$/i;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => EMAIL_PATTERN.test(value),
            message: 'Invalid Email'
        }
    },
    hashedPassword: { 
        type: String, 
        required: true 
    },
    firstname: {
        type: String,
        minlength: [1, 'The first name should be at least 1 character long'] 
    },
    lastname: {
        type: String,
        minlength: [1, 'The last name should be at least 1 character long'] 
    }
});

const collation = {
    locale: 'en',
    strength: 2
};

userSchema.index({ email: 1 }, { 
    collation
});

const User = model('User', userSchema);
User.collation = collation;

module.exports = User;