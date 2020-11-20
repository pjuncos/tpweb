const Client = require('../models/client');
const { handleMongooseValidationError } = require('./utils');
const logger = require('../logger');

const { COMMON } = require('../helpers/errors');

const createFromObject = (obj) => ({
  lastName: obj.lastName,
  firstName: obj.firstName,
  address: obj.address,
  email: obj.email,
  phone: obj.phone,
});

const listAll = (req, res) => {
  logger.info('Listing clients...');
  Client.find()
    .then((clients) => {
      logger.info(`${clients.length} clients retrieved`);
      res.status(200).send(clients);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).send({
        message: err.message || COMMON.UNKNOWN_ERROR,
      });
    });
};

const deleteById = (req, res) => {
  logger.info(`Deleting client ${req.params.id}...`);
  Client.findByIdAndRemove(req.params.id)
    .then((client) => {
      if (!client) {
        res.status(404).send({
          message: COMMON.NOT_FOUND,
        });
      } else {
        logger.info('Deleted');
        res.status(204);
      }
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).send({
        message: err.message,
      });
    });
};

const getById = (req, res) => {
  logger.info(`Getting client ${req.params.id}...`);
  Client.findById(req.params.id)
    .then((client) => {
      if (!client) {
        logger.info('Client not found');
        res.status(404).send({
          message: COMMON.NOT_FOUND,
        });
      } else {
        logger.info(client);
        res.status(200).send(client);
      }
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).send({
        message: err.message,
      });
    });
};

const create = (req, res) => {
  logger.info('Creating client...');

  const client = new Client(createFromObject(req.body));
  client.save()
    .then((newClient) => {
      res.status(201).send(newClient);
      const { _id } = newClient;
      logger.info(`Client created with id ${_id}`);
    })
    .catch((error) => {
      logger.error(error.message);
      handleMongooseValidationError(req, res, error);
    });
};

const update = (req, res) => {
  logger.info(`Updating client ${req.params.id}...`);

  const data = createFromObject(req.body);

  Client.validate(data)
    .then(
      Client.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
        .then((updated) => {
          if (!updated) {
            logger.info('Client not found');
            res.status(404).send({
              message: COMMON.NOT_FOUND,
            });
          } else {
            logger.info(updated);
            res.status(200).send(updated);
          }
        })
        .catch((err) => {
          logger.error(err.message);
          res.status(500).send({
            message: err.message,
          });
        }),
    )
    .catch((error) => {
      logger.error(error.message);
      handleMongooseValidationError(req, res, error);
    });
};

module.exports = {
  listAll, create, deleteById, getById, update,
};
