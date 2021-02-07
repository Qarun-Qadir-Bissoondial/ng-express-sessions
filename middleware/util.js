const { createFailure } = require('../responses');

module.exports = {
    // check for the presence of all required keys in req.body
    // call next() if present, else return 400 status
    hasRequiredParams: (...params) => (req, res, next) => { 
        for (const param of params) {
            if (!(param in req.body)) {
                return res.status(400).send(createFailure("Data missing"))
            }
        }

        next();
    }
}