const User = require("../db/User");
const { hasRequiredParams } = require("../middleware/util");
const { createErrResponse, createSuccessResponse } = require("../responses");

module.exports = (express, models) => {
    const { Users } = models;  
    const router = express.Router();
    
    router.post('/register', hasRequiredParams('email', 'password', 'name'), async (req, res) => {

        // extract registration info
        const {
            name,
            email,
            password,
            bio = `Hi, my name is ${name}! Nice to meet you!`
        } = req.body;
        
        // if the person exists, then return a 403 error
        const existingUser = await Users.findAll({where: { email }, plain: true})
        if (existingUser) return createErrResponse(res, 403, 'User already exists');

        // User does not exist, register user.
        Users.create({name, email, password, bio }).then(
            data => {  return createSuccessResponse(res, "User successfully created!", 200, data) },
            error => { return createErrResponse(res); }
        );
    });

    return router;
}