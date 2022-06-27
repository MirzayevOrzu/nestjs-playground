const rc = require('rc');

export const conf = rc('app', {
  port: 3000,
  env: 'development',
  db: {
    host: 'localhost',
    port: 27017,
    name: 'discipline',
  },
  jwt: {
    secret: 'secret',
    expiresIn: '1d',
  },
});
