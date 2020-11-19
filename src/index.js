const mongoose = require('mongoose');
const app = require('./app');
const config = require('./helpers/config');
const logger = require('./logger');

const port = config.PORT;

mongoose.connect(config.DB_URI, { useNewUrlParser: true });

mongoose.connection.on('error',
  (err) => logger.error(`Failed to Connect MongoDB: ${err}`));

mongoose.connection.on('disconnected',
  () => logger.info('MongoDB Disconnected'));

mongoose.connection.on('connected',
  () => {
    logger.info('MongoDB Connected');
    logger.info(config.DB_URI);
    app.listen({ port }, () => logger.info(`Server ready on port ${port}`));
  });

const onTerminate = () => {
  mongoose.connection.close(() => {
    logger.info('Close MongoDB Connection');
    process.exit(0);
  });
};

process.on('SIGINT', onTerminate).on('SIGTERM', onTerminate);
