const errorParser = (error) => error.message.split('\n');

const validationErrorParser = (error) => Object.values(error.errors).map(v => v.message);

const expressValidatorErrorParser = (error) => error.map(e => e.msg);

function parseError (error) {
    if(error.name == 'ValidationError') {
        return validationErrorParser(error);
    } else if(Array.isArray(error)) {
        return expressValidatorErrorParser(error);
    } else {
        return errorParser(error);
    }
}

module.exports = {
    parseError
};