const { createErrResponse } = require('../responses');

module.exports = {
    // check for the presence of all required keys in req.body
    // call next() if present, else return 400 status
    hasRequiredParams: (...params) => (req, res, next) => { 
        console.log(req.body);
        for (const param of params) {
            if (!(param in req.body)) {
                return createErrResponse(res, 400, 'Data missing');
            }
        }

        next();
    }
}