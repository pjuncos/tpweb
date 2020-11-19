const PORT = process.env.PORT || 80;

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const DB_PWD = process.env.DB_PWD ? encodeURIComponent(process.env.DB_PWD) : encodeURIComponent('#p4ss@w0rd$');
const DB_USR = process.env.DB_USR || 'apiUser';
const DB_NAME = process.env.DB_NAME || 'test';
const DB_HOST = process.env.DB_HOST || 'cluster0-shard-00-00.jyuwu.mongodb.net:27017,cluster0-shard-00-01.jyuwu.mongodb.net:27017,cluster0-shard-00-02.jyuwu.mongodb.net:27017';
const DB_URI = `mongodb://${DB_USR}:${DB_PWD}@${DB_HOST}/${DB_NAME}?ssl=true&replicaSet=atlas-arxfds-shard-0&authSource=admin&retryWrites=true&w=majority`;

const IMAGES = {
  MAX_SIZE: 250000,
  FIELD: 'image',
  VALID_MIMES: ['image/jpeg', 'image/png'],
};

module.exports = {
  PORT, LOG_LEVEL, DB_URI, IMAGES,
};
