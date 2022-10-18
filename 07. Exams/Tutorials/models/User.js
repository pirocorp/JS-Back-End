const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [5, 'Username must be at least 5 characters long'] },
    hashedPassword: { type: String, required: true }
});

const collation = {
    locale: 'en',
    strength: 2
};

userSchema.index({ username: 1 }, { 
    collation
});

const User = model('User', userSchema);
User.collation = collation;

module.exports = User;