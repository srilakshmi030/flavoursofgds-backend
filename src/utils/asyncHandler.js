// Express 4 does not forward rejected promises, so async handlers need wrapping.
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
