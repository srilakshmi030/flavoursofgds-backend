require('dotenv').config();

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  return value;
}

module.exports = {
  port: parseInt(required('PORT', '4000'), 10),
  nodeEnv: required('NODE_ENV', 'development'),
  corsOrigin: required('CORS_ORIGIN', 'http://localhost:3000'),

  entra: {
    tenantId: required('ENTRA_TENANT_ID', ''),
    clientId: required('ENTRA_CLIENT_ID', ''),
    clientSecret: required('ENTRA_CLIENT_SECRET', ''),
    audience: required('ENTRA_AUDIENCE', ''),
    issuer: required('ENTRA_ISSUER', ''),
  },

  jwt: {
    secret: required('JWT_SECRET', ''),
    expiresIn: required('JWT_EXPIRES_IN', '1h'),
  },

  // Non-production convenience login for the test app. Real sign-in uses Entra ID.
  devLogin: {
    password: required('DEV_LOGIN_PASSWORD', ''),
  },
};
