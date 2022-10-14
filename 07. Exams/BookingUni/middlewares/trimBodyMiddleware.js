module.exports = (...excludedKeys) => (req, res, next) => {
    if(req.body) {
        for (const key in req.body) {            
            if (excludedKeys.includes(key) || !Object.hasOwnProperty.call(req.body, key)) {
                continue;
            }

            req.body[key] = req.body[key].trim();
        }
    }

    next();
};