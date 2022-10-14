const mongoose = require('mongoose');

// TODO: change database according assignment
const CONNECTION_STRING = 'mongodb://localhost:27017/scaffoldDb'

module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('>>> Database connected');
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
};