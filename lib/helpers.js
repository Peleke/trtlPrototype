/**
 * @param {res} res Response object to modify.
 * @param {err} err Error to send to client as JSON.
 */
exports.failRequest = res => err => res.status(500).json(err)
