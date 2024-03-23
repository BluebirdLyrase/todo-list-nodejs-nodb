const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const getOsEnv = (key) => {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return process.env[key];
};

exports.env = {
  port: getOsEnv('EXPRESS_PORT'),
  prefix: getOsEnv('PREFIX'),
  version: getOsEnv('VERSION'),
};
