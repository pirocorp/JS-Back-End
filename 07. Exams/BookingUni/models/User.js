const { Schema, model } = require('mongoose');

// TODO: Make User Schema according to assignment
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [3, 'Username must be at least 3 characters long'] },
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