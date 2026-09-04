const jwt = require('jsonwebtoken');
const env = require('../config/env');

/**
 * Protects app routes using the JWT issued by this backend after a
 * successful Entra ID SSO login (see auth.controller.js).
 */
function verifyJwt(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Missing bearer token' });
  }

  jwt.verify(token, env.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyJwt;
