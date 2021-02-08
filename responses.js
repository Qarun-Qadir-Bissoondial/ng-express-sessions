/**
 * A response from the server will always container a "success" key.
 * In the case of an error, the response status code is modified and a message is returned.
 * In the case of success, it will contain a "data" key as an object/string.
 */

module.exports = {
    createErrResponse: (res, code, message) => {
        res.status(code);
        return res.send({success: false, message});
    },
    createSuccess: (data) => ({ success: true, data }),
}