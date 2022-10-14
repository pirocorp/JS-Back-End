const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        // match: [/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, 'Email is not valid.']
    },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [ /^[a-zA-Z0-9]+$/i, 'Username may contain only english letters and numbers' ]
    },
    hashedPassword: { type: String, required: true }
});

const collation = {
    locale: 'en',
    strength: 2
};

userSchema.index({ username: 1 }, { collation });
userSchema.index({ email: 1 }, { collation });

const User = model('User', userSchema);
User.collation = collation;

module.exports = User;