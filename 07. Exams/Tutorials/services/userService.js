const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const JWT_SECRET = 'V3rY_H@rd_S3cr3T';

async function register (username, password) {
    if(await findByUsername(username)) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword
    });

    // TODO: see assignement if registration create user session
    const token = createSession(user);
    return token;
}

async function login(username, password) {
    const user = await findByUsername(username);

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

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

const createSession = async ({ _id, username }) => jwt.sign({
    _id,
    username
}, JWT_SECRET);

module.exports = {
    register,
    login,
    verifyToken,
    findByUsername
};