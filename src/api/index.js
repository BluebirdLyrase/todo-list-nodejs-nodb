const fs = require('fs');
const path = require('path');
const { env } = require('../config/env');
const { promisify } = require('util');

function appendPrefix(routeName) {
  return `/${env.prefix}/${routeName}`;
}

exports.createApi = async (app) => {
  try {
    const readdir = promisify(fs.readdir);
    const folders = (await readdir('./src/api')).filter(
      (f) => !f.includes('.')
    );
    for (const folder of folders) {
      const routerPath = `./${folder}/router.js`;
      const p = path.join(__dirname, routerPath);
      if (fs.existsSync(p)) {
        const apiPath = appendPrefix(folder);
        console.info(`API PATH : ${apiPath}`);
        const routerFunction = require(routerPath);
        app.use(apiPath, routerFunction);
      } else {
        console.warn(`${routerPath} does not exist`);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
