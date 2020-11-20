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
      return res.status(200).send(clients);
    })
    .catch((err) => {
      logger.error(err.message);
      return res.status(500).send({
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
        return res.status(204).send();
      }
    })
    .catch((err) => {
      logger.error(err.message);
      return res.status(500).send({
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
        return res.status(404).send({
          message: COMMON.NOT_FOUND,
        });
      }
      logger.info(client);
      return res.status(200).send(client);
    })
    .catch((err) => {
      logger.error(err.message);
      return res.status(500).send({
        message: err.message,
      });
    });
};

const create = (req, res) => {
  logger.info('Creating client...');

  const client = new Client(createFromObject(req.body));
  client.save()
    .then((newClient) => {
      const { _id } = newClient;
      logger.info(`Client created with id ${_id}`);
      return res.status(201).send(newClient);
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
            return res.status(404).send({
              message: COMMON.NOT_FOUND,
            });
          }
          logger.info(updated);
          return res.status(200).send(updated);
        })
        .catch((err) => {
          logger.error(err.message);
          return res.status(500).send({
            message: err.message,
          });
        }),
    )
    .catch((error) => {
      logger.error(error.message);
      return handleMongooseValidationError(req, res, error);
    });
};

module.exports = {
  listAll, create, deleteById, getById, update,
};
