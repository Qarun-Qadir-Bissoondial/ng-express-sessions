/**
 * A response from the server will always container a "success" key.
 * In the case of an error, the response status code is modified and a message is returned.
 * In the case of success, it will contain a "data" key as an object/string.
 */

module.exports = {
    createErrResponse: (res, code = 500, message = "Internal Server Error") => {
        res.status(code);
        return res.send({success: false, message});
    },
    createSuccessResponse: (res, message, code = 200, data) => {
        res.status(code);
        return res.send({ success: true, message, data })
    },
    createSuccess: (data, message) => ({ success: true, data, message }),
}