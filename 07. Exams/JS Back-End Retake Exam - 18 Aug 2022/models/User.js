const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: [4, 'Username must be at least 4 characters long'] 
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        minlength: [10, 'Username must be at least 10 characters long'] 
    },
    hashedPassword: { 
        type: String, 
        required: true 
    }
});

const collation = {
    locale: 'en',
    strength: 2
};

userSchema.index({ username: 1 }, { 
    collation
 });

 userSchema.index({ email: 1 }, { 
    collation
 });

const User = model('User', userSchema);
User.collation = collation;

module.exports = User;