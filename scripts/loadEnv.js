// The intention of this script is to hide the Firebase credentials 
// when creating a build from EAS
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const easConfig = {
  cli: {
    version: '>= 9.0.3'
  },
  build: {
    development: {
      developmentClient: true,
      distribution: 'internal',
      env: {
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        DATABASE_URL: process.env.DATABASE_URL,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        MEASUREMENT_ID: process.env.MEASUREMENT_ID
      }
    },
    preview: {
      distribution: 'internal'
    },
    production: {}
  },
  submit: {
    production: {}
  }
};

fs.writeFileSync(
  // eslint-disable-next-line no-undef
  path.join(__dirname, '..', 'eas.json'),
  JSON.stringify(easConfig, null, 2)
);