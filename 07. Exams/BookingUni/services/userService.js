const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const JWT_SECRET = 'V3rY_H@rd_S3cr3T';

async function register (email, username, password) {
    const emailIsTaken = await findByEmail(email);
    const usernameIsTaken = await findByUsername(username);  

    if(emailIsTaken) {
        throw new Error('Email is taken');
    }

    if(usernameIsTaken) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword
    });

    const token = createSession(user);
    return token;
}

async function login(email, password) {
    const user = await findByEmail(email);

    if(!user) {
        throw new Error('Invalid credentials');
    }

    const success = await bcrypt.compare(password, user.hashedPassword);

    if(!success) {
        throw new Error('Invalid credentials');
    }

    const token = await createSession(user);
    return token;
}

const findByUsername = async (username) => await User
    .findOne({ username })
    .collation(User.collation);

const findByEmail = async (email) => await User
    .findOne({ email })
    .collation(User.collation);

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

const createSession = async ({ _id, email, username }) => jwt.sign({
    _id,
    email,
    username
}, JWT_SECRET);

module.exports = {
    register,
    login,
    verifyToken,
    findByUsername
};