/**
 * A response from the server will always container a "success key".
 * In the case of an error, it will contain a "message" key.
 * In the case of data being returned, it will contain a "data" key
 */

module.exports = {
    createSuccess: (data) => ({ success: true, data }),
    createFailure: (message) => ({sucess: false, message})
}