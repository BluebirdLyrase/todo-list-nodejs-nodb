const express = require('express');
const { env } = require('./src/config/env');
const bodyParser = require('body-parser');
const { createApi } = require('./src/api');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

const limiter = rateLimit({
  windowsMs: 60 * 1000,
  max: 200,
});
app.use(limiter);
createApi(app);
app.listen(env.port, () =>
  console.info(
    `Server is running port (${process.pid}): ${env.port} version ${env.version}`
  )
);
