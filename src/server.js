const app = require('./app');
const env = require('./config/env');
const sequelize = require('./db/sequelize');

async function start() {
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.error('Could not connect to PostgreSQL. Is `npm run db:up` running?');
    console.error(err.message);
    process.exit(1);
  }

  app.listen(env.port, () => {
    console.log(`flavoursofgds-backend listening on port ${env.port} [${env.nodeEnv}]`);
  });
}

start();
