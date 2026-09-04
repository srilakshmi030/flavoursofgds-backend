require('dotenv').config();

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  return value;
}

module.exports = {
  port: parseInt(required('PORT', '4000'), 10),
  nodeEnv: required('NODE_ENV', 'development'),
  corsOrigin: required('CORS_ORIGIN', 'http://localhost:3000'),

  // Media host differs per environment (sandbox vs production storage account).
  blobBaseUrl: required('BLOB_BASE_URL', ''),

  db: {
    host: required('DB_HOST', 'localhost'),
    port: parseInt(required('DB_PORT', '5432'), 10),
    name: required('DB_NAME', 'flavoursofgds'),
    user: required('DB_USER', 'flavours'),
    password: required('DB_PASSWORD', ''),
    // Azure Database for PostgreSQL requires TLS; local Docker does not.
    ssl: required('DB_SSL', 'false') === 'true',
  },

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
