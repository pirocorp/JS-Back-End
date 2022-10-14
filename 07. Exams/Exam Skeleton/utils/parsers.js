const errorParser = (error) => error.message.split('\n');

const validationErrorParser = (error) => Object.values(error.errors).map(v => v.message);

function parseError (error) {
    if(error.name == 'ValidationError') {
        return validationErrorParser(error);
    }

    if(error.name == 'Error') {
        return errorParser(error);
    }
}

module.exports = {
    parseError
};