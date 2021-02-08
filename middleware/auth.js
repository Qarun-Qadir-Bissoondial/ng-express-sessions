const { createErrResponse } = require("../responses")

module.exports = {
    /**
     * Guards route against unauthorized entry. 
     * This middleware ensures the user is logged in before proceeding
     */
    isLoggedIn: (req, res, next) => {
        if (!req.session.userId) {
            return createErrResponse(res, 401, 'Login Required!');
        }

        next();
    }
}