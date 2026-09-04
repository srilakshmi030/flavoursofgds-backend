const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

// POST /api/auth/login - exchanges a verified Microsoft Entra ID token
// (validated by verifyEntraToken middleware) for an app-issued JWT.
function login(req, res) {
  const entraUser = req.entraUser;

  const payload = {
    sub: entraUser.oid || entraUser.sub,
    name: entraUser.name,
    email: entraUser.preferred_username || entraUser.email,
    tenantId: entraUser.tid,
  };

  const token = jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });

  res.status(200).json({ token, expiresIn: env.jwt.expiresIn, user: payload });
}

function safeEquals(a, b) {
  const bufferA = Buffer.from(String(a));
  const bufferB = Buffer.from(String(b));
  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(bufferA, bufferB);
}

// POST /api/auth/dev-login - local test-app sign-in. Disabled unless
// DEV_LOGIN_PASSWORD is set and NODE_ENV is not production.
function devLogin(req, res) {
  if (env.nodeEnv === 'production' || !env.devLogin.password) {
    return res.status(404).json({ message: 'Not found' });
  }

  const { username, password } = req.body;

  if (!safeEquals(password, env.devLogin.password)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const payload = {
    sub: `dev-${username.toLowerCase()}`,
    name: username,
    email: username.includes('@') ? username : `${username}@ey.com`,
    tenantId: 'dev-tenant',
  };

  const token = jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });

  res.status(200).json({ token, expiresIn: env.jwt.expiresIn, user: payload });
}

module.exports = { login, devLogin };
