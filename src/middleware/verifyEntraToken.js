const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const env = require('../config/env');

// Fetches Microsoft Entra ID signing keys and caches them.
const client = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${env.entra.tenantId}/discovery/v2.0/keys`,
  cache: true,
  cacheMaxAge: 60 * 60 * 1000,
  rateLimit: true,
});

function getSigningKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

/**
 * Verifies a Microsoft Entra ID (Azure AD) access/id token supplied by the
 * frontend after MSAL sign-in. On success, attaches the decoded claims to
 * req.entraUser so a route can exchange it for an app-issued JWT.
 */
function verifyEntraToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Missing bearer token' });
  }

  jwt.verify(
    token,
    getSigningKey,
    {
      audience: env.entra.audience,
      issuer: env.entra.issuer,
      algorithms: ['RS256'],
    },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired Entra ID token', error: err.message });
      }
      req.entraUser = decoded;
      next();
    }
  );
}

module.exports = verifyEntraToken;
