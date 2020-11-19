const Model = require('../models/product');
const { handleMongooseValidationError } = require('./utils');
const logger = require('../logger');

const { COMMON } = require('../helpers/errors');

const createFromObject = (obj) => ({
  title: obj.title,
  description: obj.description,
});

const listAll = (req, res) => {
  logger.info('Listing products...');
  Model.find()
    .then((items) => {
      logger.info(`${items.length} items retrieved`);
      res.status(200).send(items);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).send({
        message: err.message || COMMON.UNKNOWN_ERROR,
      });
    });
};

const deleteById = (req, res) => {
  logger.info(`Deleting Product ${req.params.id}...`);
  Model.findByIdAndRemove(req.params.id)
    .then((item) => {
      if (!item) {
        res.status(404).send({
          message: COMMON.NOT_FOUND,
        });
      } else {
        logger.info('Successfully deleted');
        res.status(200).send({
          message: 'Successfully deleted',
        });
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
  logger.info(`Getting Product ${req.params.id}...`);
  Model.findById(req.params.id)
    .then((item) => {
      if (!item) {
        logger.info('Not found');
        res.status(404).send({
          message: COMMON.NOT_FOUND,
        });
      } else {
        logger.info(item);
        res.status(200).send(item);
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
  logger.info('Creating Product...');

  const model = new Model(createFromObject(req.body));
  model.save()
    .then((newItem) => {
      res.send(newItem);
      const { _id } = newItem;
      logger.info(`Poduct created with id ${_id}`);
    })
    .catch((error) => {
      logger.error(error.message);
      handleMongooseValidationError(req, res, error);
    });
};

const update = (req, res) => {
  logger.info(`Updating Product ${req.params.id}...`);

  const data = createFromObject(req.body);

  Model.validate(data)
    .then(
      Model.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
        .then((updated) => {
          if (!updated) {
            logger.info('Not found');
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
